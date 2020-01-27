const express = require("express");
const app = module.exports = express();
const Veggie = require("../models/Veggie")

app.get("/", (req, res)=>{
    //res.send('Welcome to \nEat Your Veggies!')
    veg = new Veggie();
    veg.all(function(result){
        const veg_obj = {
            veg: result
        }
        console.log(veg_obj)
        res.render("index", veg_obj)

    })
});