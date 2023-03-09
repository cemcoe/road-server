import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "http";
import Koa from "koa";
import cors from "@koa/cors";
import koaBody from "koa-body"; // 解析post body
import serve from "koa-static"; // 静态服务
import { router } from "./routes/index.js";
import { PORT } from "./config.js";
import initSocket from "./socket/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new Koa();

app.use(cors());

const staticPath = path.join(__dirname, "./static/uploads");
console.log(staticPath);

// $ 这个一定要加，没有后面会404
app.use(serve("."));
app.use(serve(staticPath));

app.use(
  koaBody({
    multipart: true, // 支持多文件上传
    // encoding: "gzip", // 编码格式
    formidable: {
      uploadDir: staticPath, // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFileSize: 2000 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
    },
  })
);

app.use(router.routes());
app.use(router.allowedMethods());

const httpServer = createServer(app.callback());
initSocket(httpServer);
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
