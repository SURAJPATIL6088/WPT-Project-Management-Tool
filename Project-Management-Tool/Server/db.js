import { createConnection } from "mysql2";

const connection = createConnection({
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "Project"
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database.");
});

export function getConnection(){
  return connection;
}