/*
    This is the CHARTS API
    All the analysis and request is made here.
    This API will make an HTTP request to AppAnnie API
    Get all the applications that are trending
    and calculates which ones are new and which are not
    Result will be recently-developed trending applications or games
*/
const express = require("express");

const app = express();
// create an express instance

// use body parser
// will be used for parsing the http request for getting the charts
const bodyParser = require("body-parser");
// relate this body parser to the express server
app.use(bodyParser.urlencoded({extended: false}));


const router = express.Router();

// THERE IS NO VIEW 
// BECAUSE THIS ROUTER / SERVER DOES NOT SERVE HTML PAGE

// Get the cookie from the data folder, we will use it in http request
const COOKIE = require("../../data/cookie");
// Get the origin information from the data folder, we will use it in http request
const ORIGIN = require("../../data/origin");


// Import requestBody function to create request body with desired paramters
let requestBody = require("./requestBody");

// Import Address of the API
// i.e. URL
const theURL = require("../../data/URL");

/* CONSTANTS */

const ANDROID = "android";

const IOS = "ios";

const GAMES = "100001";
// category id for games

const APPS = "100000";
// category id for all categories

/* CONFIGURATIONS */

const LIMIT = "400";
// search in 400 apps

const CONTENT_TYPE = "application/json";




router.get("/:choice", (request, response,next) => {

    // First get the choice, whether the user wants 
    // applications or games
    // it changes everything
    let CHOICE = request.params.choice;
    // choice can be games, or apps, otherwise send 400



    console.log("Hi");
    response.status(200).send("selam");
});

// Export this router object
module.exports = router;