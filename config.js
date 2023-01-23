const PORT = 3001; // 服务监听端口

const sqlConnectionStr = {
  host: "127.0.0.1", // 数据库地址
  user: "root", // 数据库用户
  password: "123456", // 数据库密码
  database: "road", // 选中数据库
};

const secret = "1111"; // jwt 密钥

export { PORT, sqlConnectionStr, secret };
