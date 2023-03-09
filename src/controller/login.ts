import { Context } from 'koa'
import jsonwebtoken from "jsonwebtoken";
import { runSqlStatement } from "../mysql/index.js";
import userService from "../service/userService.js";
import { secret } from "../config.js";

// 用户注册
async function create(ctx: Context) {
  const { name, password } = ctx.request.body;

  const statement = `SELECT * FROM users WHERE name='${name}'`;

  try {
    const result = await runSqlStatement(statement);

    const isCreated = Boolean(result.length);

    if (isCreated) {
      ctx.body = {
        status: 2001,
        mag: "抱歉，该用户名已经被注册",
      };
    } else {
      const statement = `insert into users(name, password, created_at) values('${name}', '${password}', CURRENT_TIMESTAMP());`;

      try {
        const result = await runSqlStatement(statement);

        if (result) {
          ctx.body = {
            status: 200,
            msg: "注册成功",
          };
        }
      } catch (error) {
        ctx.body = {
          status: 500,
          msg: "数据库错误",
        };
      }
    }
  } catch (error) {
    // TODO: 中间件处理
    console.log(error);
    ctx.body = {
      status: 500,
      msg: "数据库错误",
    };
  }
}

// 用户登录
async function login(ctx: Context) {
  const { name, password } = ctx.request.body;
  try {
    const user = await userService.userLogin({ name, password })
    const { id } = user
    const token = jsonwebtoken.sign({ id, name }, secret, { expiresIn: "1d" });
    ctx.body = {
      status: 200,
      data: {
        token,
        user,
      }
    };

  } catch (error) {
    // 异常可以细化
    ctx.body = {
      status: 401,
    };
    return;
  }
}

// 获取登录用户信息
async function getOwnerInfo(ctx: Context) {
  // 拿到登录用户的id
  // console.log(ctx.state, 'state')

  const { id } = ctx.state.user;
  // 查数据库找用户详细信息

  const statement = `SELECT * FROM users WHERE id='${id}'`;
  const result = await runSqlStatement(statement);

  if (!result.length) {
    // TODO: 更加友好的返回码，该用户不存在，密码错误
    // 没有匹配到对应的用户名和密码
    ctx.body = {
      status: 401,
    };
    return;
  }

  ctx.body = {
    status: 200,
    data: {
      user: {
        ...result[0],
      },
    },
  };
}

const getOwnerPostList = async (ctx: Context) => {
  const { status } = ctx.query;


  const uid = ctx.state.user.id;


  // 连表查询将用户id对应到用户名
  let statement = `
    SELECT p.id, p.author_id, p.title, p.abstract, p.status, p.created_at, p.updated_at, u.name, u.avatar
    FROM posts p
    INNER JOIN users u
    WHERE p.author_id = u.id AND p.author_id = ${uid}
    ORDER BY p.updated_at DESC
    limit ${0}, ${20};`;

  if (status === 'private') {
    statement = `
    SELECT p.id, p.author_id, p.title, p.abstract, p.status, p.created_at, p.updated_at, u.name, u.avatar
    FROM posts p
    INNER JOIN users u
    WHERE p.author_id = u.id AND p.author_id = ${uid} AND status = 0
    ORDER BY p.updated_at DESC
    limit ${0}, ${20};`;

  }



  const posts = await runSqlStatement(statement);
  // console.log(result)

  // format posts {...} => {..., author: {...}}
  // 这个需求是不是MySQL就可以做？

  const result = posts.map((item: any) => {
    const { author_id, name, avatar } = item;
    const author = {
      id: author_id,
      name,
      avatar,
    };

    const { id, title, abstract, created_at, updated_at, status } = item;
    const post = {
      id,
      title,
      abstract,
      commentcount: 0,
      viewcount: 0,
      imgsLink: [],
      status,
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

export { create, login, getOwnerInfo, getOwnerPostList };
