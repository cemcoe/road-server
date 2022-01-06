const Router = require('koa-router')
const router = new Router()

const jsonwebtoken = require('jsonwebtoken')
const jwt = require('koa-jwt')

const { secret } = require('../config')
const { getUsersList } = require('../controllers/user.js')

router.get('/', (ctx) => {
  ctx.body = '欢迎使用书盒api'
})

// 获取用户列表
router.get('/v1/users', getUsersList)

// 用户登录
router.get('/v1/login', (ctx) => {
  // 拿到用户信息
  const user = {
    _id: 111,
    name: 'cemcoe',
  }

  // 登录成功，返回token
  const { _id, name } = user
  // 拿_id和name加密
  const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1d' })
  // 登录成功返回token
  ctx.body = {
    status: 200,
    data: {
      token,
      user,
    }
  }
})

const auth = jwt({ secret })
// 获取登录用户信息
router.get('/v1/user',auth, (ctx) => {
  // 拿到登录用户的id
  console.log(ctx.state)
  ctx.body = {
    data: {
      ...ctx.state
    }
  }
})

module.exports = router