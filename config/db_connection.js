var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "yourRootPassword",
    database: "veggies_db"
})

connection.connect(function (err){
    if (err){
        console.error("An error occured.")
        throw err
    }

    console.log("Connected as id: " + connection.threadId)
})

module.exports = connection