const Router = require('koa-router')
const router = new Router()
const { getUsersList } = require('../controllers/user.js')

// 获取用户列表
router.get('/users', getUsersList)

module.exports = router