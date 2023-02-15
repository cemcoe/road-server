import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Koa from "koa";
import cors from '@koa/cors';
import koaBody from "koa-body"; // 解析post body
import serve from "koa-static"; // 静态服务

import { router } from "./routes/index.js";
import { PORT } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = new Koa();

// 跨域问题
// app.use(async (ctx, next) => {
//   // log request URL:
//   ctx.set("Access-Control-Allow-Origin", "*");
//   ctx.set(
//     "Access-Control-Allow-Methods",
//     "POST, GET, PUT, OPTIONS, DELETE, PATCH"
//   );
//   ctx.set("Access-Control-Max-Age", "3600");
//   ctx.set(
//     "Access-Control-Allow-Headers",
//     "x-requested-with,Authorization,Content-Type,Accept"
//   );
//   ctx.set("Access-Control-Allow-Credentials", "true");
//   if (ctx.request.method == "OPTIONS") {
//     ctx.response.status = 200;
//   }
//   console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
//   try {
//     await next();
//     console.log("handler通过");
//   } catch (err) {
//     console.log("handler处理错误");
//     ctx.response.status = err.statusCode || err.status || 500;
//     ctx.response.body = {
//       message: err.message,
//     };
//   }
// });
app.use(cors())


const staticPath = path.join(__dirname, './static/uploads')
console.log(staticPath)

// $ 这个一定要加，没有后面会404
app.use(serve("."));
app.use(serve(staticPath))

app.use(koaBody({
  multipart: true, // 支持多文件上传
  // encoding: "gzip", // 编码格式
  formidable: {
    uploadDir: staticPath, // 设置文件上传目录
    keepExtensions: true, // 保持文件的后缀
    maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
  }
})).use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
