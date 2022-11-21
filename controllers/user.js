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
  getUsersList,
  getUserDetail,
  getUserPostList,
};
