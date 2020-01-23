const connection = require("./db_connection")
require("console.table")

const orm = {
    add_veggie: function (veg_name, veg_state, callback) {
        const query_string =
            `
                INSERT INTO veggies(veg_name, veg_state)
                VALUES (?, ?)
            `
        connection.query(query_string, [veg_name, veg_state], function (err, res) {
            if (err) throw ("orm.add_veggie err: ", err);
            // console.log(res)
            //console.log(res.insertId)
            callback(res)
        })
    },

    // devour_veggie: function (veg_name, callback) {
    //     const query_string =
    //         `
    //             UPDATE veggies
    //             SET veg_state = true
    //             WHERE veg_name = ?
    //         `;
    //     connection.query(query_string, [veg_name], function (err, res) {
    //         if (err) throw err;
    //         // console.log(res)
    //         callback(res);
    //     })
    // },

    remove_test_veggies: function (callback) {
        const query_string =
        `
            DELETE
            FROM veggies
            WHERE veg_name LIKE "%Test%"
        `;

        connection.query(query_string, function(err, res){
            if (err) throw err;
            // console.table(res);
            callback(res);
        })
    },

    select_devoured: function(callback){
        const query_string =
        `
            SELECT veg_name
            FROM veggies
            WHERE veg_state=TRUE
        `;

        connection.query(query_string, function(err, res){
            if (err) throw err;
            // console.table(res);
            callback(res);
        });
    },

    select_not_eaten: function(callback){
        const query_string =
        `
            SELECT veg_name
            FROM veggies
            WHERE veg_state=FALSE
        `;

        connection.query(query_string, function(err, res){
            if (err) throw err;
            // console.table(res);
            callback(res);
        });
    }

}

module.exports = orm;