const mysql = require("mysql");
const { sqlConnectionStr } = require("../config");
const connection = mysql.createConnection(sqlConnectionStr);

const runSqlStatement = (statement) => {
  console.log("TODO: statement 语句校验");
  return new Promise((resolve, reject) => {
    // Statement: 'SELECT * FROM user'
    connection.query(statement, (error, results, fields) => {
      // https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
      // This is because caching_sha2_password is introduced in MySQL 8.0, but the Node.js version is not implemented yet.
      // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';

      if (error) {
        console.log("MySQL ERROR:", error);
        reject(error);
      } else {
        console.log(results, "results");
        resolve(results);
      }
    });
  });
};

module.exports = {
  runSqlStatement,
};
