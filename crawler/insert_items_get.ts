import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { runSqlStatement } from "../src/mysql/index.js";
import { generateCreateTableSQL, generateInsertSql } from "../src/utils/sql.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

// 读取目录下所有文件
// 读取目录下的所有文件名
fs.readdir(__dirname + "/mdata/", (err, files) => {
  if (err) throw err;
  // console.log(files);

  files.forEach((file) => {
    fs.readFile(__dirname + `/mdata/${file}`, "utf8", (err, data) => {
      if (err) throw err;
      // console.log(data);
      // const sql = generateCreateTableSQL(response.data, "mercari_items");
      const { sql } = generateInsertSql(JSON.parse(data).data, "mercari_items");
      // console.log(sql);
      try {
        runSqlStatement(sql).catch((error) => {
          console.log("ddd");
        });
      } catch (error) {
        console.log(error);
      }
    });
  });
});

// 异步读文件
// fs.readFile(__dirname + "/mdata/m23034645730.json", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
//   // const sql = generateCreateTableSQL(response.data, "mercari_items");
//   const { sql } = generateInsertSql(JSON.parse(data).data, "mercari_items");
//   console.log(sql);
//   runSqlStatement(sql);
// });
