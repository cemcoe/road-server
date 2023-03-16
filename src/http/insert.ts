import { data } from "./data.js";
import { runSqlStatement } from "../mysql/index.js";

function generateInsertStatement(data: any) {
  const tableName = "mercari";
  let fields = Object.keys(data); // 获取数据对象的所有字段名
  let values = fields.map((field) => {
    let value = data[field]; // 获取数据对象中对应字段的值
    if (typeof value === "string") {
      // 如果值是字符串类型，需要用单引号括起来，并去除特殊字符
      return `'${value.replace(/'/g, "''").replace(/[\(\)]/g, "")}'`;
    } else if (typeof value === "object" && !Array.isArray(value)) {
      // 如果值是对象类型，需要将其转换为JSON格式字符串
      return JSON.stringify(value);
    } else if (Array.isArray(value)) {
      // 如果值是数组类型，需要将其转换为字符串，并去除特殊字符
      return `'${value
        .map((item) =>
          item
            .toString()
            .replace(/'/g, "''")
            .replace(/[\(\)]/g, "")
        )
        .join(", ")}'`;
    } else {
      // 其他类型的值直接返回
      return value;
    }
  });
  // 拼接插入语句
  let sql = `INSERT INTO ${tableName} (${fields.join(
    ", "
  )}) VALUES (${values.join(", ")});`;
  return sql;
}

data.map((item) => {
  runSqlStatement(generateInsertStatement(item));
});
