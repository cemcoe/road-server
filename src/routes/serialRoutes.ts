import Router from "koa-router";
import {
  getSerialPostList
} from "../controller/serial.js";

function serialRoutes(router: Router) {
  // 获取连载文章列表
  router.get("/v1/serial/:id", getSerialPostList);

}


export {
  serialRoutes
}