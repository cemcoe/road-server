// 生成建表SQL的函数
function generateCreateTableSQL(obj: any, tableName: string) {
  let columns = [];
  for (let key in obj) {
    let type = typeof obj[key];
    if (type === "string") {
      columns.push(`${key} VARCHAR(255)`);
    } else if (type === "number") {
      columns.push(`${key} DOUBLE`);
    } else if (type === "object") {
      columns.push(`${key} TEXT`);
    } else {
      columns.push(`${key} TEXT`);
    }
  }
  let sql = `CREATE TABLE ${tableName} (${columns.join(", ")});`;
  return sql;
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

export { generateCreateTableSQL };
