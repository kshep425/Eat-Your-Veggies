
function initialize_connection(obj){
    var mysql = require("mysql");
    var connection = mysql.createConnection(obj)

    connection.connect(function (err){
        if (err){
            console.error("An error occured.")
            throw err
        }
        // console.log("Connected as id: " + connection.threadId)
    })

    return connection
}

module.exports = initialize_connection;