import mysql from "mysql";
import { marked } from 'marked';
import { runSqlStatement } from "../mysql/index.js";

const createPost = async (ctx) => {
  // console.log(ctx.request.body)
  // TODO: 从请求体中取出用户名校验用户名和密码
  // 借助 koa-body 解析body参数

  // 拿到登录用户的id
  const { id } = ctx.state.user;
  // const { title = '默认标题', abstract, content } = ctx.request.body
  // 上面的语法有待商榷
  // 当要提取的对象对应属性解析为 undefined，变量就被赋予默认值。前端可能传过来空字符串
  // TODO: 生成摘要等，丰富文章信息
  const { content } = ctx.request.body;
  const htmlContent = marked.parse(content)
  const title = ctx.request.body.title || "默认标题";
  const abstract = ctx.request.body.abstract || content.slice(0, 100);

  // 根据内容生成摘要
  // const abstract = content.slice(0, 20)

  const mysqlContent = mysql.escape(`${content}`); // 转义特殊字符，插入数据库
  const mysqlHtmlContent = mysql.escape(`${htmlContent}`)

  const statement = `INSERT INTO posts(title, author_id, content, content_html, abstract, created_at, updated_at) VALUES('${title}', '${id}', ${mysqlContent},${mysqlHtmlContent}, '${abstract}', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());`;
  const result = await runSqlStatement(statement);
  console.log("--", result, "--");

  if (result) {
    const { insertId } = result;
    ctx.body = {
      status: 200,
      data: {
        insertId,
        htmlContent
      },
    };
  }
};

// 更新文章
const updatePost = async (ctx) => {
  // 借助 koa-body 解析body参数

  // TODO: 拿到登录用户的id，判断登录用户id和文章对应的作者id是否一致
  // const { id } = ctx.state.user
  const { pid } = ctx.params;
  // const { title = '默认标题', abstract, content } = ctx.request.body
  // 上面的语法有待商榷
  // 当要提取的对象对应属性解析为 undefined，变量就被赋予默认值。前端可能传过来空字符串
  // TODO: 生成摘要等，丰富文章信息
  // const { content } = ctx.request.body

  // TODO: 可以随意更新可更新的字段，目前仅支持更新内容
  // const title = ctx.request.body.title || '默认标题'
  // const abstract = ctx.request.body.abstract || content.slice(0, 100)

  // 可以提供可选择的参数
  // TODO: 抽一下，注意一下安全，有些字段是不能修改的，抽空换成orm
  let demo = "";
  Object.keys(ctx.request.body).forEach((key) => {
    const mysqlContent = mysql.escape(`${ctx.request.body[key]}`); // 转义特殊字符，插入数据库

    // TODO: 摘要等需要单独处理
    demo = demo + `${key}=${mysqlContent},`;
  });

  // console.log(demo, 'demo')

  // 根据内容生成摘要
  // const abstract = content.slice(0, 20)

  // const mysqlContent = mysql.escape(`${content}`) // 转义特殊字符，插入数据库

  const statement = `UPDATE posts SET ${demo.slice(
    0,
    -1
  )}, updated_at=CURRENT_TIMESTAMP() WHERE id=${pid};`;
  console.log(statement, "state");
  const result = await runSqlStatement(statement);
  console.log("--", result, "--");

  if (result) {
    const { insertId } = result;
    ctx.body = {
      status: 200,
      data: {
        insertId,
      },
    };
  }
};

// 获取文章列表
const getPostList = async (ctx) => {
  // 默认每页展示10篇文章
  // 可以提供参数每页多少个以及页数以及关键字

  // -- DQL5.分页查询
  // -- select 字段1，字段2... from 表明 limit m,n
  // -- m: 整数，表示从第几条索引开始，计算方式 （当前页-1）*每页显示条数
  // -- n: 整数，表示查询多少条数据
  // select * from keywords limit 0, 2;
  // init var

  let { per_page = 10 } = ctx.query;
  let { page = 1 } = ctx.query;

  page = Math.max(page * 1, 1);
  per_page = Math.max(per_page * 1, 1);

  const n = per_page;
  const m = (page - 1) * n;

  // 连表查询将用户id对应到用户名
  const statement = `
  SELECT p.id, p.author_id, p.title, p.abstract, p.content, p.created_at, p.updated_at, u.name, u.avatar
  FROM posts p
  INNER JOIN users u
  WHERE p.author_id = u.id 
  ORDER BY p.updated_at DESC
  limit ${m}, ${n};`;

  const statement2 = `
  SELECT count(*) as total 
  FROM posts p
  INNER JOIN users u
  WHERE p.author_id = u.id; 
  `

  const posts = await runSqlStatement(statement);
  const { total } = (await runSqlStatement(statement2))[0]

  // console.log(result)

  // format posts {...} => {..., author: {...}}
  // 这个需求是不是MySQL就可以做？

  // 根据文章内容生成imgsLiast

  const result = posts.map((item) => {
    const { author_id, name, avatar } = item;
    const author = {
      id: author_id,
      name,
      avatar,
    };

    const { id, title, abstract, content, created_at, updated_at } = item;

    // gen imgsLink

    // 获取文章中图片列表
    const imgRe =
      /(https?:[^:<>"]*\/)([^:<>"]*)(\.((png!thumbnail)|(png)|(jpg)|(webp)))/g;
    let imgsLink = [];
    // 默认图片列表为空，如果在文章中找到图片则更新图片列表
    if (imgRe.test(content)) {
      imgsLink = content.match(imgRe);
    }

    const post = {
      id,
      title,
      abstract,
      commentcount: 0,
      viewcount: 0,
      imgsLink,
      status: 0,
      wordcount: 0,
      created_at,
      updated_at,
    };

    return {
      ...post,
      author,
    };
  });

  if (result) {
    ctx.body = {
      status: 200,
      data: {
        postList: result,
        total,
        page,
        per_page
      },
    };
  }
};

const getPostDetail = async (ctx) => {
  const pid = ctx.params.id;
  const statement = `
  SELECT p.id, p.author_id, u.name, avatar, p.title, p.abstract, p.content, p.content_html
  FROM posts p
  INNER JOIN users u
  WHERE p.author_id = u.id AND p.id = ${pid};`;

  const post = await runSqlStatement(statement);
  console.log(post, 'pppp')

  const result = post.map((item) => {
    const { id, title, content, author_id, content_html } = item;
    const { name, avatar } = item;

    return {
      id,
      title,
      content,
      content_html,
      author: {
        id: author_id,
        name,
        avatar,
      },
    };
  });

  if (!result.length) {
    ctx.body = {
      status: 404,
    };
    return;
  }
  // console.log(result)
  ctx.body = {
    status: 200,
    data: {
      post: result[0],
    },
  };
};

export { createPost, getPostList, getPostDetail, updatePost };
