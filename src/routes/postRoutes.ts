import Router from "koa-router";

import jwt from "koa-jwt";
import { secret } from "../config.js";
import {
  createPost,
  getPostList,
  getPostDetail,
  updatePost,
} from "../controller/post.js";

const auth = jwt({ secret });
const auth_info = jwt({ secret, passthrough: true })



function postRoutes(router: Router) {
  // ------文章相关------
  // 创建新文章
  router.post("/v1/posts", auth, createPost);

  // 更新文章
  router.patch("/v1/posts/:pid", updatePost);

  // 获取文章列表
  router.get("/v1/posts", getPostList);

  // 获取文章详情
  router.get("/v1/posts/:id", auth_info, getPostDetail);

}

export {
  postRoutes
}