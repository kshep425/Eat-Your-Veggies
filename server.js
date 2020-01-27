// Psuedocode

// db_connection.js in database folder
var connection = require("./config/db_connection")
// connect to database;

// put sql in db folder
// create database schema.sql
// create seed.sql
// create table
    // veg_id integer not null auto_increment
    // vegetable_name string
    // devoured default false

// create test
    // instantiate a veggie
    // add veggie to database
    // devour veggie

// create vegetable class
    // add_veggie_to_db method
    // devour_veggie method

// create api test?
    // get veggies
    // post veggies

// Import routes and give the server access to them.
    // create get veggie api routes
const express = require("express");

var PORT = process.env.PORT || 3000;

const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


const api_routes = require("./routes/api_routes")
const index_routes = require("./routes/index")
app.use(api_routes);
app.use(index_routes);


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});


// create post veggie api routes
// create home page route

// create main handlebar template in views/layouts folder
// create index handlebar template in views folder

// design home page