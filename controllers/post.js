const { runSqlStatement } = require('../mysql/index.js')

const createPost = async (ctx) => {
  console.log(ctx.request.body)
  // TODO: 从请求体中取出用户名校验用户名和密码
  // 借助 koa-body 解析body参数

  // 拿到登录用户的id
  const { id } = ctx.state.user
  const { content } = ctx.request.body
  // TODO: 生成摘要等，丰富文章信息

  const statement = `INSERT INTO post(authorId, content) VALUES('${id}', '${content}');`
  const result = await runSqlStatement(statement)
  // console.log(result)

  if (result) {
    ctx.body = {
      status: 200,
      data: {
        msg: '成功',
      }
    }
  }
}


module.exports = {
  createPost,
}

