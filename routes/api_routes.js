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

const express = require("express");
const app = express();
const orm = require("../config/orm");
require("console.table")
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/veg/uneaten", function(req, res){
    orm.select_not_eaten(function(result){
        // console.table(result)
        res.json(result)
    })
})

app.get("/api/veg/eaten", function(req, res){
    orm.select_devoured(function(result){
        // console.table(result)
        res.json(result)
    })
})

app.put("/api/veg/eat/:id", function(req, res){
    const id = req.params.id
    const state = true
    orm.update_veg_state(id,state,function(result){
        // console.table(result)
        res.json(result)
    })
})

app.post("/api/veg", function(req, res){
    const veg_name = req.body.veg_name;
    const state = false;
    orm.add_veggie(veg_name, state, function(result){
        // console.table(result);
        res.json(result);
    });
});

module.exports = app;