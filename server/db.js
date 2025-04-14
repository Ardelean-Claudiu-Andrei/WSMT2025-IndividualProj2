const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Test@123", // ← parola ta reală de MySQL!
  database: "crud_app",
});

module.exports = pool.promise();
