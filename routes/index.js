const Router = require('koa-router')
const router = new Router()
const { getUsersList } = require('../controllers/user.js')

router.get('/', (ctx) => {
  ctx.body = '欢迎使用书盒api'
})

// 获取用户列表
router.get('/users', getUsersList)

module.exports = router