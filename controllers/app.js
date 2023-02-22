
import { runSqlStatement } from "../mysql/index.js";

async function getAppInfo(ctx) {
  // 查询用户列表
  const statement = `SELECT * FROM app ORDER BY create_at DESC;`;
  const result = await runSqlStatement(statement);
  // console.log(result[0]);

  ctx.body = {
    status: 200,
    data: {
      app: result
      
    }
  }
}



export { getAppInfo };
