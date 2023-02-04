import Koa from "koa";
import koaBody from "koa-body"; // 解析post body
import { router } from "./routes/index.js";
import { PORT } from "./config.js";

const app = new Koa();

// 跨域问题
app.use(async (ctx, next) => {
  // log request URL:
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, OPTIONS, DELETE, PATCH"
  );
  ctx.set("Access-Control-Max-Age", "3600");
  ctx.set(
    "Access-Control-Allow-Headers",
    "x-requested-with,Authorization,Content-Type,Accept"
  );
  ctx.set("Access-Control-Allow-Credentials", "true");
  if (ctx.request.method == "OPTIONS") {
    ctx.response.status = 200;
  }
  console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
  try {
    await next();
    console.log("handler通过");
  } catch (err) {
    console.log("handler处理错误");
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message,
    };
  }
});

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
  }
})).use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
