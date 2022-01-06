const { runSqlStatement } = require('../mysql/index.js')
const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../config')

// 获取用户列表
const getUsersList = (ctx) => {
  ctx.body = '获取用户列表'
};

const login = async (ctx) => {

  // TODO: 从请求体中取出用户名校验用户名和密码
  const statement = `SELECT * FROM user WHERE id=1`
  const result = await runSqlStatement(statement)

  if(!result.length) {
    // TODO: 更加友好的返回码，该用户不存在，密码错误
    ctx.body = {
      status: 401,
    }
    return 
  }
  const { id, name } = result[0]
  // console.log(id, name, result)
  const token = jsonwebtoken.sign({ id, name }, secret, { expiresIn: '1d' })

  // console.log(result, 'async')
  // 登录成功返回token
  ctx.body = {
    status: 200,
    data: {
      token,
    }
  }
}

module.exports = {
  getUsersList,
  login,
}

