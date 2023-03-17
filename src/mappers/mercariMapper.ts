import { runSqlStatement } from "../mysql/index.js";

const statement = (m: number, n: number) =>
  `SELECT * FROM mercari limit ${m}, ${n}`;

const statement2 = (id: string) =>
  `SELECT * FROM mercari_items WHERE mercari_items.id='${id}'`;

class mercariMapper {
  async queryMercari(m: number, n: number) {
    const result = await runSqlStatement(statement(m, n));
    return result;
  }

  async queryMercariItemById(id: string) {
    const result = await runSqlStatement(statement2(id));
    return result;
  }
}

export default new mercariMapper();
