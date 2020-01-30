/* ************************

api_routes.test.js

This file will test the api routes
to:
 - get all vegetables : api/veg
 - get all uneaten vegetables : api/veg/uneaten
 - get all devoured vegetables : api/veg/eaten
 - get a vegetable by id : api/veg/:id
 - add a new vegetable : api/veg/add
 - devour a vegetable : api/veg/eat/:id

*************************** */
const request = require("supertest")
const app = require("../routes/api_routes.js")
const orm = require("../config/orm");
const initialize_connection = require("../config/db_connection");
let connection;
const db_conn_obj = require("../config/config")

describe("Test api Routes", () => {
    beforeAll((cb)=>{
        connection = initialize_connection(db_conn_obj)
        cb()
    })
    beforeEach((cb)=>{
        orm.remove_test_veggies(() => {
            // console.log("All test veggies removed")
            cb()
        })
    })

    it("Can get all veggies", (done)=>{
        request(app)
            .get("/api/veg")
            .set("Accept", "application/json")
            .expect(200, done)
    })

    it("Can get all uneaten vegetables", async (done) => {

        const all_veg =[
            { veg_id: 2, veg_name: 'carrots', veg_state: 0 },
            { veg_id: 4, veg_name: 'onion', veg_state: 0 },
            { veg_id: 6, veg_name: 'Spinach', veg_state: 0 },
            { veg_id: 7, veg_name: 'Radish', veg_state: 0 },
            { veg_id: 8, veg_name: null, veg_state: 0 },
            { veg_id: 9, veg_name: 'Spinach', veg_state: 0 },
            { veg_id: 10, veg_name: 'Radish', veg_state: 0 },
            { veg_id: 11, veg_name: 'Spinach', veg_state: 0 },
            { veg_id: 12, veg_name: 'Radish', veg_state: 0 },
            { veg_id: 13, veg_name: 'Spinach', veg_state: 0 },
            { veg_id: 14, veg_name: 'Radish', veg_state: 0 },
            { veg_id: 15, veg_name: 'Spinach', veg_state: 0 },
            { veg_id: 16, veg_name: 'Radish', veg_state: 0 },
            { veg_id: 571, veg_name: null, veg_state: 0 },
            { veg_id: 577, veg_name: null, veg_state: 0 }
          ]

        request(app)
            .get("/api/veg/uneaten")
            .set("Accept", "application/json")
            .expect(200, all_veg, done)
    })

    it("Can get all devoured vegetables", (done) => {
        request(app)
            .get("/api/veg/eaten")
            .set("Accept", "application/json")
            .expect(200, done)
    })

    // it ("Can get a vegetable by id", (done)=>{

    // })

    it ("Can add a new vegetable", (done)=>{
        veg_name = "Test_Add_Brocolli"
        request(app)
        .post("/api/veg")
        .send({veg_name: veg_name})
        .expect(200, function(err, res){
            if (err) return done(err);
            request(app)
            request(app)
            .get("/api/veg/uneaten")
            .set("Accept", "application/json")
            .expect(200, /Test_Add_Brocolli/, done)
        })
    })

    describe("Devour added veggie", () => {

        it("Can devour a vegetable", (done) => {
            // Given Test_Devour_Brocolli has a false veg_state
            // When put api/veg/eat/:id is called
            // Then Test Deveour Brocolli has a true veg_state
            orm.add_veggie("Test_Devour_Brocolli", false, (result) => {
                // console.table(result)
                let id = result.insertId
                // console.log(id)

            request(app)
                .put("/api/veg/eat/" + id)
                // .set('Content-Type', 'application/x-www-form-urlencoded')
                //.send({ body: { id: id, state: false } })
                .expect(200, function (err) {
                    if (err) return done(err)
                    request(app)
                        .get("/api/veg/eaten")
                        .set("Accept", "application/json")
                        .expect(200, /Test_Devour_Brocolli/, done)
                })
            })
        })

    })


})