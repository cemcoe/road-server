import Router from "koa-router";
import { getShopItems } from "../controller/mercari.js";

function mercariRoutes(router: Router) {
  // 获取商品列表
  router.get("/v1/mercari/items", getShopItems);
}

export { mercariRoutes };
