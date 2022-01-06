const Koa = require('koa');
const app = new Koa();
// const Router = require('koa-router');
// var router = new Router();
const router = require('./routes')
const { PORT } = require('./config')

// router.get('/', (ctx, next) => {
//   ctx.body = '/';
// });

// 跨域问题
app.use(async (ctx, next) => {
  // log request URL:
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE, PATCH");
  ctx.set("Access-Control-Max-Age", "3600");
  ctx.set("Access-Control-Allow-Headers", "x-requested-with,Authorization,Content-Type,Accept");
  ctx.set("Access-Control-Allow-Credentials", "true");
  if (ctx.request.method == "OPTIONS") {
    ctx.response.status = 200
  }
  console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
  try {
    await next();
    console.log('handler通过')
  } catch (err) {
    console.log('handler处理错误')
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods());

// const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});