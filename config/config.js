
require('dotenv').config()

let db_obj = {
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql"
}

module.exports = db_obj