const Router = require('koa-router')
const router = new Router()
const jwt = require('koa-jwt')

const { secret } = require('../config')
const { getUsersList, login } = require('../controllers/user.js')

router.get('/', (ctx) => {
  ctx.body = '欢迎使用书盒api'
})

// 获取用户列表
router.get('/v1/users', getUsersList)

// 用户登录
router.post('/v1/login', login)

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