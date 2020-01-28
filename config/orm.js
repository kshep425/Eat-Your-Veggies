const initialize_connection = require("./db_connection")
// const db_conn_obj =
// {
//     database: "veggies_db",
//     user: "root",
//     password: "yourRootPassword",
//     host: "localhost",
//     port: 3306
// }
config = require("./config.json")
const db_conn_obj = config["production"]
console.log(db_conn_obj);

require("console.table")

const orm = {
    connection: initialize_connection(db_conn_obj),

    add_veggie: function (veg_name, veg_state, callback) {
        // https://www.sitepoint.com/javascript-truthy-falsy/
        // runs if veg_name is false, 0, '', NaN, null or undefined
        console.log("add_veggie: " + veg_name)
        if(!veg_name){
            console.log("Should throw now!")
            throw ("Please include name of vegetable")
        }
        const query_string =
            `
                INSERT INTO veggies(veg_name, veg_state)
                VALUES (?, ?)
            `
        this.connection.query(query_string, [veg_name, veg_state], function (err, res) {
            if (err) console.log("Failed to add Veggie");
            // console.log(res)
            // console.log(res.insertId)
            callback(res)
        })
    },

    update_veg_state: function (veg_id, veg_state, callback) {
        if(veg_id === undefined){
            throw ("Please include vegetable id")
        }
        const query_string =
            `
                UPDATE veggies
                SET veg_state = ?
                WHERE veg_id = ?
            `;
        this.connection.query(query_string, [veg_state, veg_id], function (err, res) {
            if (err) throw err;
            // console.log(res)
            callback(res);
        })
    },

    remove_test_veggies: function (callback) {
        const query_string =
        `
            DELETE
            FROM veggies
            WHERE veg_name LIKE "%Test%"
        `;

        this.connection.query(query_string, function(err, res){
            if (err) throw err;
            // console.table(res);
            callback(res);
        })
    },

    select_devoured: function(callback){
        const query_string =
        `
            SELECT *
            FROM veggies
            WHERE veg_state=TRUE
        `;

        this.connection.query(query_string, function(err, res){
            if (err) throw err;
            // console.table(res);
            callback(res);
        });
    },

    select_not_eaten: function(callback){
        const query_string =
        `
            SELECT *
            FROM veggies
            WHERE veg_state=FALSE
        `;

        this.connection.query(query_string, function(err, res){
            if (err) throw err;
            // console.table(res);
            callback(res);
        });
    },

    get_veggies: function(callback){
        const query_string =
        `
            SELECT *
            FROM veggies
        `
        this.connection.query(query_string, function(err, res){
            if (err) throw ("Can't get your veggies today");
            callback(res)
        })
    }
}

module.exports = orm;