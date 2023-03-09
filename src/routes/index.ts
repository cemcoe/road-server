import Router from "koa-router";
import { loginRoutes } from "./loginRoutes.js";
import { userRoutes } from "./userRoutes.js";
import { postRoutes } from "./postRoutes.js";
import { serialRoutes } from "./serialRoutes.js";
import { systemRoutes } from "./systemRoutes.js";

const router = new Router();

router.get("/", (ctx) => {
  ctx.body = "Welcome to use xbook api!";
});

loginRoutes(router);
userRoutes(router);
postRoutes(router);
serialRoutes(router);
systemRoutes(router);

export { router };
