const Router = require('koa-router')
const router = new Router()
const { getUsersList } = require('../controllers/user.js')

router.get('/', (ctx) => {
  ctx.body = '欢迎使用书盒api'
})

// 获取用户列表
router.get('/users', getUsersList)

// 用户登录
router.get('/users', (ctx) => {
  ctx.body = '用户登录'
})

module.exports = router