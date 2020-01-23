const orm = require("../config/orm");
const connection = require("../config/db_connection");

describe("ORM Tests",()=> {
    afterAll(() => {
        //orm_remove_test_veggies()
        //.then((result) => {
            connection.end();
            // return result;
        //})
        //.catch((err) => {throw err});
    });
    it("Can select all veg_names with veg_state of true", ()=>{
        connection.query("SELECT veg_name FROM veggies WHERE veg_state=TRUE", function(err, res){

            expect(() =>{
                orm.select_devoured(function(result){
                    expect(res).toEqual(false);
                })
            });
        })
    })

    it("Can select all veg_names with veg_state of false", ()=>{
        connection.query("SELECT veg_name FROM veggies WHERE veg_state=FALSE", function(err, res){
//            expect(err).toBe(false);
            expect(()=>{
                orm.select_not_eaten(function(result){
                    expect(res).toEqual(false);
                });
            })

        })

    })
})