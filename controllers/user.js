const { runSqlStatement } = require("../mysql/index.js");

// 获取用户列表
const getUsersList = async (ctx) => {
  // 查询用户列表
  const statement = `SELECT * FROM users`;
  const result = await runSqlStatement(statement);
  console.log(result);

  ctx.body = {
    status: 200,
    data: {
      users: result,
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

module.exports = {
  getUsersList,
  getUserDetail,
  getUserPostList,
};
