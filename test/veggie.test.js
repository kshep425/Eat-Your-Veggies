const Veggie = require("../models/Veggie");

describe("Veggie Class Tests", () => {
    beforeAll(() => {
        // orm.remove_test_veggies(function(cb){
        //     cb("Removed Test Veggies");
        // })
    });

    // afterAll(() => {
    //     //orm.remove_test_veggies(function(){
    //     connection.end();
    //     //})
    // });

    it("Can Instantiate a Veggie", () => {
        const veg = new Veggie();
        expect(typeof veg).toBe("object")
    })

    it("Can add Veggie", () => {
        const veg = new Veggie();
        const veg_name = "Test_Spinach"
        veg.add(veg_name, function () {
            expect(veg.get_veg_name()).toEqual(veg_name)
            expect(veg.get_veg_state()).toBe(false);
        });
    })

    it("Can devour a Veggie", () => {
        const veg = new Veggie();
        const veg_name = "Test_Radish"
        veg.add(veg_name, function () {
            veg.devour(function () {
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

    it("Can add veggie to db", (done) => {

        const veg = new Veggie();
        const veg_name = "Test_Radish"
        veg.add(veg_name, function (add_result) {

            expect.hasAssertions();
            const expected = {
                veg_id: add_result.insertId,
                veg_name: veg_name,
                veg_state: false
            }
            expect(veg.get_veg()).toEqual(expected)
            done();
        })
    })

    it("Can add a devoured veggie to db", (done) => {
        const veg = new Veggie();
        const veg_name = "Test_Radish"
        veg.add(veg_name, function (add_result) {
            expect.hasAssertions();

            veg.devour(function (devour_result) {
                expect.hasAssertions();

                const expected = {
                    veg_id: add_result.insertId,
                    veg_name: veg_name,
                    veg_state: true
                };
                expect(veg.get_veg()).toEqual(expected);
                done();
            })
        })
    })

    it("Can get devoured veg information", (done) => {
        const veg = new Veggie();
        const veg_name = "Test_Cabbage"
        veg.add(veg_name, function (add_result) {
            expect.hasAssertions();

            veg.devour(function () {
                expect.hasAssertions();

                const expected = {
                    veg_id: add_result.insertId,
                    veg_name: veg_name,
                    veg_state: true
                }
                expect(veg.get_veg()).toEqual(expected)
                done();
            })

        });
    })

    it ("Add Veg to db throws error if veg_name is undefined", function(){
        const veg = new Veggie();
        expect(() => veg.add_to_db(()=>{})).toThrow("Please include name of vegetable");
    })

    it ("Update Veg State in db throws error if veg_id is undefined", function(callback){
        const veg = new Veggie();
        callback(expect(() => veg.update_db_veg_state(()=>{})).toThrow("Please include vegetable id"));
    })

    it ("Can return all vegetables", function(callback){
        const veg = new Veggie();
        veg.all(function(res){
            expect(typeof res).toBe("object")
            console.log(Object.keys(res[0]))
            expect(Object.keys(res[0])).toEqual(["veg_id", "veg_name", "veg_state"])
            callback()
        })
    })

})