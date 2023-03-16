import { runSqlStatement } from "../mysql/index.js";

const statement = (m: number, n: number) =>
  `SELECT * FROM mercari limit ${m}, ${n}`;

class mercariMapper {
  async queryMercari(m: number, n: number) {
    const result = await runSqlStatement(statement(m, n));
    return result;
  }
}

export default new mercariMapper();
