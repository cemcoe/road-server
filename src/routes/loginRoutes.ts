import Router from "koa-router";
import jwt from "koa-jwt";
import {
  create,
  login,
  getOwnerInfo,
  getOwnerPostList,
} from "../controller/login.js";
import { secret } from "../config.js";

const auth = jwt({ secret });
function loginRoutes(router: Router) {
  // 用户注册
  router.post("/v1/users", create);
  // 用户登录
  router.post("/v1/login", login);
  // 获取登录用户信息
  router.get("/v1/owner", auth, getOwnerInfo);
  // 获取登录用户文章列表
  router.get("/v1/owner/posts", auth, getOwnerPostList);
}

export { loginRoutes };
