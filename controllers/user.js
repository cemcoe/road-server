import { runSqlStatement } from "../mysql/index.js";

// 获取用户列表
const getUsersList = async (ctx) => {
  let { per_page = 10 } = ctx.query;
  let { page = 1 } = ctx.query;

  page = Math.max(page * 1, 1);
  per_page = Math.max(per_page * 1, 1);

  const n = per_page;
  const m = (page - 1) * n;

  // 查询用户列表
  const statement = `SELECT * FROM users limit ${m}, ${n};`;
  const result = await runSqlStatement(statement);
  console.log(result);
  const statement2 = `SELECT count(*) as total FROM users;`;
  const {total} =(await runSqlStatement(statement2))[0]

  ctx.body = {
    status: 200,
    data: {
      users: result,
      total,
      page,
      per_page
    },
  };
};

const getUserDetail = async (ctx) => {
  const { uid } = ctx.params;
  const statement = `
  SELECT *
  FROM users
  WHERE id = ${uid};`;

  const result = await runSqlStatement(statement);

  if (!result.length) {
    ctx.body = {
      status: 404,
    };
    return;
  }
  // console.log(result)
  ctx.body = {
    status: 200,
    data: {
      user: result[0],
    },
  };
};

const getUserPostList = async (ctx) => {
  const { uid } = ctx.params;

  // const statement = `
  // SELECT p.id, p.title, p.abstract
  // FROM posts p
  // WHERE p.author_id = ${uid};`;

  // 连表查询将用户id对应到用户名
  const statement = `
    SELECT p.id, p.author_id, p.title, p.abstract, p.created_at, p.updated_at, u.name, u.avatar
    FROM posts p
    INNER JOIN users u
    WHERE p.author_id = u.id AND p.author_id = ${uid}
    limit ${0}, ${20};`;

  const posts = await runSqlStatement(statement);
  // console.log(result)

  // format posts {...} => {..., author: {...}}
  // 这个需求是不是MySQL就可以做？

  const result = posts.map((item) => {
    const { author_id, name, avatar } = item;
    const author = {
      id: author_id,
      name,
      avatar,
    };

    const { id, title, abstract, created_at, updated_at } = item;
    const post = {
      id,
      title,
      abstract,
      commentcount: 0,
      viewcount: 0,
      imgsLink: [],
      status: 0,
      wordcount: 0,
      created_at,
      updated_at,
    };

    return {
      ...post,
      author,
    };
  });

  if (result) {
    ctx.body = {
      status: 200,
      data: {
        postList: result,
      },
    };
  }
};

export { getUsersList, getUserDetail, getUserPostList };
