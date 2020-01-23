const Veggie = require("../Veggie.js");
const connection = require("../config/db_connection")
const orm = require("../config/orm")
const util = require("util")
const orm_remove_test_veggies = util.promisify(orm.remove_test_veggies)

describe("Veggie Class Tests", () => {
    beforeAll(() => {
        orm_remove_test_veggies()
        .then((result) => {return result})
        .catch((err) => {throw err});
    });

    afterAll(() => {
        orm_remove_test_veggies()
        .then((result) => {
            connection.end();
            return result
        })
        .catch((err) => {throw err});
    });

    it("Can Instantiate a Veggie", () => {
        const veg = new Veggie();
        expect(typeof veg).toBe("object")
    })

    it("Can add Veggie", () => {
        const veg = new Veggie();
        const veg_name = "Test_Spinach"
        veg.add(veg_name, function(result){
            expect(veg.get_veg_name()).toEqual(veg_name)
            expect(veg.get_veg_state()).toBe(false);

        });
    })

    it("Can devour a Veggie", () => {
        const veg = new Veggie();
        const veg_name = "Test_Radish"
        veg.add(veg_name, function(result){
            veg.devour(function(result){
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

    it ("Can get new veg information", () => {
        const veg = new Veggie();
        const veg_name = "Test_Radish"
        const result = veg.add(veg_name, function(result){
            const expected = {
                veg_id: result.insertId,
                veg_name: veg_name,
                veg_state: false
            }
            expect(veg.get_veg()).toEqual(expected)
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
            });

        });
    })
})