const mysql = require("mysql");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbtoko",
});

db.getConnection((err) => {
    if (err) {
      console.error("Tidak ter connect:", err.stack);
      return;
    }
    console.log("TERHUBUNG KE MYSQL");
  });
  
  module.exports = db;