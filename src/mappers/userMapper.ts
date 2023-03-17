import { runSqlStatement } from "../mysql/index.js";
const BASE_COLUM_LIST = "id, name, bio, avatar";

const statement = (name: string, password: string) =>
  `SELECT ${BASE_COLUM_LIST} FROM users WHERE name='${name}' AND password='${password}'`;

class userMapper {
  async queryUserByNameAndPassword(name: string, password: string) {
    const result = await runSqlStatement(statement(name, password));
    return result;
  }
}

export default new userMapper();
