const Veggie = require("../Veggie.js");
const connection = require("../config/db_connection")
const orm = require("../config/orm")
const util = require("util")
// const orm_remove_test_veggies = util.promisify(orm.remove_test_veggies)

describe("Veggie Class Tests", () => {
    beforeAll(() => {
        // orm.remove_test_veggies(function(cb){
        //     cb("Removed Test Veggies");
        // })
    });

    afterAll(() => {
        //orm.remove_test_veggies(function(){
            connection.end();
        //})
     });

    it("Can Instantiate a Veggie", () => {
        const veg = new Veggie();
        expect(typeof veg).toBe("object")
    })

    it("Can add Veggie", () => {
        const veg = new Veggie();
        const veg_name = "Test_Spinach"
        veg.add(veg_name, function(){
            expect(veg.get_veg_name()).toEqual(veg_name)
            expect(veg.get_veg_state()).toBe(false);
        });
    })

    it("Can devour a Veggie", () => {
        const veg = new Veggie();
        const veg_name = "Test_Radish"
        veg.add(veg_name, function(){
            veg.devour(function(){
                expect(veg.get_veg_name()).toEqual(veg_name)
                expect(veg.get_veg_state()).toBe(true);
            })
        });
    })

    it("Throws error when adding veggie without veg_name", () => {
        const veg = new Veggie();
        expect(() => {
            veg.add();
        }).toThrow();

        expect(() => {
            veg.add();
        }).toThrow(Error);

        expect(() => {
            veg.add();
        }).toThrow("Error: Please include name of vegetable");
    })

    it ("Can add veggie to db", () => {
        const veg = new Veggie();
        const veg_name = "Test_Radish"
        veg.add(veg_name, function (db_result) {

                const expected = {
                    veg_id: db_result.insertId,
                    veg_name: veg_name,
                    veg_state: false
                }
                expect(veg.get_veg()).toEqual(expected)

        })
    })

    it ("Can add a devoured veggie to db", () => {
        const veg = new Veggie();
        const veg_name = "Test_Radish"
        veg.add(veg_name, function (db_result) {
            veg.devour(function(){
                    const expected = {
                        veg_id: db_result.insertId,
                        veg_name: veg_name,
                        veg_state: true
                    }
                    expect(veg.get_veg()).toEqual(expected)

            })
        })
    })

    it ("Can get devoured veg information", () => {
        const veg = new Veggie();
        const veg_name = "Test_Cabbage"
        veg.add(veg_name, function(add_result){
                veg.devour(function(){

                    const expected = {
                        veg_id: add_result.insertId,
                        veg_name: veg_name,
                        veg_state: true
                    }
                    expect(veg.get_veg()).toEqual(expected)

            })

        });
    })
})