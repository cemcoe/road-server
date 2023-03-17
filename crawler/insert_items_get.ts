import { response } from "./data_items_get.js";
import { runSqlStatement } from "../src/mysql/index.js";
import { generateCreateTableSQL, generateInsertSql } from "../src/utils/sql.js";

// const sql = generateCreateTableSQL(response.data, "mercari_items");
const { sql } = generateInsertSql(response.data, "mercari_items");
console.log(sql);

runSqlStatement(sql);
