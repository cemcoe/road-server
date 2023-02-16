
import { runSqlStatement } from "../mysql/index.js";

// 获取连载文章列表
const getSerialPostList = async (ctx) => {
  const serialId = ctx.params.id

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
  WHERE p.author_id = u.id AND p.status = 1 AND p.serial_id=${serialId}
  ORDER BY p.updated_at DESC
  limit ${m}, ${n};`;

  const statement2 = `
  SELECT count(*) as total, s.title, s.abstract, s.cover
  FROM posts p
  INNER JOIN users u
  INNER JOIN serial s
  WHERE p.author_id = u.id AND p.status = 1 AND p.serial_id=${serialId}; 
  `

  const posts = await runSqlStatement(statement);
  const serialInfo = (await runSqlStatement(statement2))[0]

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
        ...serialInfo,
        page,
        per_page
      },
    };
  }
};



export { getSerialPostList };
