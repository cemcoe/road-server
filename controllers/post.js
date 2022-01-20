const { runSqlStatement } = require('../mysql/index.js')
const mysql = require('mysql')

const createPost = async (ctx) => {
  // console.log(ctx.request.body)
  // TODO: 从请求体中取出用户名校验用户名和密码
  // 借助 koa-body 解析body参数

  // 拿到登录用户的id
  const { id } = ctx.state.user
  // const { title = '默认标题', abstract, content } = ctx.request.body
  // 上面的语法有待商榷
  // 当要提取的对象对应属性解析为 undefined，变量就被赋予默认值。前端可能传过来空字符串
  // TODO: 生成摘要等，丰富文章信息
  const { content } = ctx.request.body
  const title = ctx.request.body.title || '默认标题'
  const abstract = ctx.request.body.abstract || content.slice(0, 100)

  // 根据内容生成摘要
  // const abstract = content.slice(0, 20)

  const mysqlContent = mysql.escape(`${content}`) // 转义特殊字符，插入数据库

  const statement = `INSERT INTO post(title, authorId, content, abstract, created_at) VALUES('${title}', '${id}', ${mysqlContent}, '${abstract}', now());`
  const result = await runSqlStatement(statement)
  console.log('--', result, '--')

  if (result) {
    const { insertId } = result
    ctx.body = {
      status: 200,
      data: {
        insertId,
      }
    }
  }
}

// 更新文章
const updatePost = async (ctx) => {
  // 借助 koa-body 解析body参数

  // TODO: 拿到登录用户的id，判断登录用户id和文章对应的作者id是否一致
  // const { id } = ctx.state.user
  const { pid } = ctx.params
  // const { title = '默认标题', abstract, content } = ctx.request.body
  // 上面的语法有待商榷
  // 当要提取的对象对应属性解析为 undefined，变量就被赋予默认值。前端可能传过来空字符串
  // TODO: 生成摘要等，丰富文章信息
  const { content } = ctx.request.body

  // TODO: 可以随意更新可更新的字段，目前仅支持更新内容
  const title = ctx.request.body.title || '默认标题'
  const abstract = ctx.request.body.abstract || content.slice(0, 100)

  // 根据内容生成摘要
  // const abstract = content.slice(0, 20)

  const mysqlContent = mysql.escape(`${content}`) // 转义特殊字符，插入数据库

  const statement = `UPDATE post SET content=${mysqlContent} WHERE id=${pid};`
  console.log(statement, 'state')
  const result = await runSqlStatement(statement)
  console.log('--', result, '--')

  if (result) {
    const {changedRows} = result
    ctx.body = {
      status: 200,
      data: {
        changedRows,
      }
    }
  }
}

// 获取文章列表
const getPostList = async (ctx) => {
  // 连表查询将用户id对应到用户名
  const statement = `
  SELECT p.id, p.authorId, u.name authorName, avatar, p.title, p.abstract
  FROM post p
  INNER JOIN user u
  WHERE p.authorId = u.id;`

  const result = await runSqlStatement(statement)
  // console.log(result)
  if (result) {
    ctx.body = {
      status: 200,
      data: {
        postList: result
      }
    }
  }


}

const getPostDetail = async (ctx) => {
  const pid = ctx.params.id
  const statement = `
  SELECT p.id, p.authorId, u.name authorName, avatar, p.title, p.abstract, p.content
  FROM post p
  INNER JOIN user u
  WHERE p.authorId = u.id AND p.id = ${pid};`

  const result = await runSqlStatement(statement)

  if (!result.length) {
    ctx.body = {
      status: 404,
    }
    return
  }
  // console.log(result)
  ctx.body = {
    status: 200,
    data: {
      post: result[0]
    }
  }
}


module.exports = {
  createPost,
  getPostList,
  getPostDetail,
  updatePost,
}

