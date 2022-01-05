const Koa = require('koa');
const app = new Koa();
// const Router = require('koa-router');
// var router = new Router();
const router = require('./routes')
const {PORT, sqlConnectionStr} = require('./config')

// router.get('/', (ctx, next) => {
//   ctx.body = '/';
// });

const mysql = require('mysql')
const connection = mysql.createConnection(sqlConnectionStr)

// 执行sql脚本对数据库进行读写 
connection.query('SELECT * FROM user', (error, results, fields) => {
  // https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
  // This is because caching_sha2_password is introduced in MySQL 8.0, but the Node.js version is not implemented yet.
  // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
  if (error) throw error
  // connected! 
  console.log(results, 'select')

});

app
  .use(router.routes())
  .use(router.allowedMethods());

// const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});