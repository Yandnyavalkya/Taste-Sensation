const mysql = require("mysql2");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TasteSensation",
    port: 3306
});

con.connect((err) => {
    if (err) throw err;
    console.log("Database connected successfully.");
});

module.exports = con;
