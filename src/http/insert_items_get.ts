import { response } from "./data_items_get.js";
import { runSqlStatement } from "../mysql/index.js";
import { generateCreateTableSQL } from "../utils/sql.js";

const sql = generateCreateTableSQL(response.data, "mercari_items");
console.log(sql);

runSqlStatement(sql);
