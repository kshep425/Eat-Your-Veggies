const orm = require("../config/orm");
const connection = require("../config/db_connection");

describe("ORM Tests",()=> {

    afterAll(() => {
        connection.end();
    });

    it ("Can select all veg_names with veg_state of true", function(cb) {
        orm.select_devoured(function(result){
            const query_string =
            `
                SELECT veg_name
                FROM veggies
                WHERE veg_state=TRUE
            `;

            connection.query(query_string, function(err, conn_result){
                cb(expect(result).toEqual(conn_result))
            })
        })
    })

    it ("Can select all veg_names with veg_state of false", function(cb) {
        orm.select_not_eaten(function(result){
            const query_string =
            `
                SELECT veg_name
                FROM veggies
                WHERE veg_state=FALSE
            `;

            connection.query(query_string, function(err, conn_result){
                cb(expect(result).toEqual(conn_result))
            })
        })
    })

    it ("Can remove test veggies", function(cb){
        orm.remove_test_veggies(function(result){
            const query_string =
            `
                SELECT count(*) as count
                FROM veggies
                WHERE veg_name LIKE "%Test%"
            `;

            connection.query(query_string, function(err, conn_result){
                cb(expect(conn_result[0]["count"]).toEqual(0))
            })
        })
    })

    // it("add_veggie should callback", function(){
    //     const mock_callback = jest.fn((x) => {
    //         // console.log(x)
    //         return x});
    //     orm.add_veggie("Test_Collard_Greens", false, mock_callback);
    //     //expect(mock_callback.mock.calls.length).toBe(1);
    //     expect(mock_callback.mock.result).toBe(1);
    // })

})