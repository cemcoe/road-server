const Router = require('koa-router')
const router = new Router()

// 获取用户列表
router.get('/users', (ctx) => {
  ctx.body = '获取用户列表'
})

module.exports = router