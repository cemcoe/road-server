const Router = require('koa-router')
const router = new Router()

const jsonwebtoken = require('jsonwebtoken')
const jwt = require('koa-jwt')

const { secret } = require('../config')
const { getUsersList } = require('../controllers/user.js')
const { runSqlStatement } = require('../mysql/index.js')

router.get('/', (ctx) => {
  ctx.body = '欢迎使用书盒api'
})

// 获取用户列表
router.get('/v1/users', getUsersList)

// 用户登录
router.get('/v1/login', async (ctx) => {

  // TODO: 从请求体中取出用户名校验用户名和密码
  const statement = `SELECT * FROM user WHERE id=10`
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
})

const auth = jwt({ secret })
// 获取登录用户信息
router.get('/v1/user', auth, (ctx) => {
  // 拿到登录用户的id
  console.log(ctx.state)
  ctx.body = {
    data: {
      ...ctx.state
    }
  }
})

module.exports = router