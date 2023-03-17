// 生成建表SQL的函数
function generateCreateTableSQL(obj: any, tableName: string) {
  let columns = [];
  for (let key in obj) {
    let type = typeof obj[key];
    if (type === "string") {
      columns.push(`${key} VARCHAR(255)`);
    } else if (type === "number") {
      columns.push(`${key} DOUBLE`);
    } else if (type === "boolean") {
      columns.push(`${key} Boolean`);
    } else if (type === "object") {
      columns.push(`${key} TEXT`);
    } else {
      columns.push(`${key} TEXT`);
    }
  }
  let sql = `CREATE TABLE ${tableName} (${columns.join(", ")});`;
  return sql;
}

// 生成插入sql
function generateInsertSql(obj: any, tableName: string) {
  let fields = [];
  let values = [];

  for (let field in obj) {
    if (typeof obj[field] === "object") {
      fields.push(field);
      values.push(JSON.stringify(obj[field]));
      // values.push(field);
    } else if (typeof obj[field] === "boolean") {
      fields.push(field);
      values.push(obj[field] ? true : false);
    } else {
      fields.push(field);
      values.push(obj[field]);
    }
  }

  const sql = `INSERT INTO ${tableName} (${fields.join(", ")}) VALUES (${values
    .map((value) => (typeof value === "string" ? `'${value}'` : value))
    .join(", ")})`;
  return { sql, fields };
}

function test() {
  const order = {
    order_id: 12345,
    customer_name: "John Doe",
    items: [
      { name: "item 1", price: 10.99 },
      { name: "item 2", price: 19.99 },
    ],
    shipping_address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
    },
  };
  // 调用生成建表SQL的函数
  const createTableSQL = generateCreateTableSQL(order, "orders");
  console.log(createTableSQL); // 输出建表SQL语句
}

function test2() {
  const person = {
    id: 1,
    name: "John",
    age: 30,
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
    },
    hobbies: ["reading", "traveling"],
  };
  const tableName = "person";

  const { sql, fields } = generateInsertSql(person, tableName);
  console.log(sql); // 输出：INSERT INTO person (id, name, age, address, hobbies) VALUES (1, 'John', 30, '{"street":"123 Main St","city":"New York","state":"NY"}', '["reading","traveling"]')
  console.log(fields); // 输出：['id', 'name', 'age', 'address', 'hobbies']
}

export { generateCreateTableSQL, generateInsertSql };
