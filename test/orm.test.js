require("console.table")
const orm = require("../config/orm");
const initialize_connection = require("../config/db_connection");
let connection;

describe("ORM Tests", () => {
    beforeAll((cb) => {

        const db_conn_obj =
        {
            database: "veggies_db",
            user: "root",
            password: "yourRootPassword",
            host: "localhost",
            port: 3306
        }
        connection = initialize_connection(db_conn_obj)
        orm.remove_test_veggies(() => {
            // console.log("All test veggies removed")
            cb()
        })

    })

    it("Can select all veg_names with veg_state of true", function (cb) {
       cb( orm.select_devoured(function (result) {
            result.forEach((veg) =>{
                expect(veg.veg_state).toBe(1)
            })
        })
       )
    })

    it("Can select all veg_names with veg_state of false", function (cb) {
       cb( orm.select_not_eaten(function (result) {
            result.forEach((veg) =>{
                expect(veg.veg_state).toBe(0)
            })
        }))
    })

    it("Can remove test veggies", function (cb) {
        orm.remove_test_veggies(function (result) {
            const query_string =
                `
                SELECT count(*) as count
                FROM veggies
                WHERE veg_name LIKE "%Test%"
            `;

            connection.query(query_string, function (err, conn_result) {
                cb(expect(conn_result[0]["count"]).toEqual(0))
            })
        })
    })

    it("Can update state in database to devoured", (cb) => {
        // Given I add a veggie
        // When I devour the veggie
        // Then veg state is true in db
        orm.add_veggie("Test_Eggplant", false, function (add_result) {
            const veg_id = add_result.insertId;
            orm.update_veg_state(veg_id, true, function (result) {
                const query_string =
                    `
                    SELECT veg_state
                    FROM veggies
                    WHERE veg_id = ?
                `
                connection.query(query_string, [veg_id], function (err, query_result) {
                    expect.hasAssertions();
                    if (err) throw err;
                    cb(expect(query_result[0]["veg_state"]).toEqual(1));
                })
            })

        })
    })

    // describe("Validate thrown errors with incorrect password", function(){
    //     beforeAll(()=>{
    //         const wrong_conn_obj =
    //             {
    //                 database: "veggies_db",
    //                 user: "root",
    //                 password: "wrong password",
    //                 host: "localhost",
    //                 port: 3306
    //             }
    //         try{
    //             orm.connection = initialize_connection(wrong_conn_obj);
    //         }
    //         catch(err){
    //             console.error(err)
    //         }
    //     })

        // it ("Add Veggie Throws Error", async (cb)=>{

        //     let test_cb =  async() =>{
        //         orm.add_veggie("Test_Red_Onion_1234567890ertyuioasdfghjklzxcvbnm1234567890ertyuioasdfghjklzxcvbnm123", false, expect.toThrow("Failed to add Veggie"))
        //     }
        //     cb(test_cb);
        // })
    //})


})