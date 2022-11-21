const { runSqlStatement } = require("../mysql/index.js");
const jsonwebtoken = require("jsonwebtoken");
const { secret } = require("../config");

// 用户注册
const create = async (ctx) => {
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
};

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

const login = async (ctx) => {
  console.log(ctx.request.body);
  // TODO: 从请求体中取出用户名校验用户名和密码
  // 借助 koa-body 解析body参数
  const { name, password } = ctx.request.body;
  const statement = `SELECT * FROM users WHERE name='${name}' AND password='${password}'`;
  const result = await runSqlStatement(statement);
  console.log(result);

  if (!result.length) {
    // TODO: 更加友好的返回码，该用户不存在，密码错误
    // 没有匹配到对应的用户名和密码
    ctx.body = {
      status: 401,
    };
    return;
  }
  const { id } = result[0];
  // console.log(id, name, result)
  const token = jsonwebtoken.sign({ id, name }, secret, { expiresIn: "1d" });
  // console.log(result, 'async')
  // 登录成功返回token
  ctx.body = {
    // 匹配到了对应的用户名和密码
    status: 200,
    data: {
      token,
    },
  };
};

const getOwnerInfo = async (ctx) => {
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
      ...result[0],
    },
  };
};

const getUserDetail = async (ctx) => {
  const { uid } = ctx.params;
  const statement = `
  SELECT id, name, avatar, gender
  FROM user
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
  const statement = `
  SELECT p.id, p.title, p.abstract
  FROM post p
  WHERE p.authorId = ${uid};`;

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
      postList: result,
    },
  };
};

module.exports = {
  create,
  getUsersList,
  login,
  getOwnerInfo,
  getUserDetail,
  getUserPostList,
};
