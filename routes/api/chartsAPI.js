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

// Import today function to get the date of the today in formatted way
const today = require("../../functionalities/today");

// Import Axios modules for making HTTP Requests to AppAnnie API
const axios = require("axios");

// Import parseResponseIntoObjects function
// for parsing the http response into products array
const parseResponseIntoObjects = require("../../functionalities/parseResponseIntoObjects");

// Import filter function
// for filtering products based on recency
const filteredProductsBasedOnRecency = require("../../functionalities/filterProductsBasedOnRecency");

// Import filter function that filters
// games from apps
const filterGamesFromApps = require("../../functionalities/filterGamesFromApps");

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

var CATEGORY = GAMES; 
// this will be category, whether Game or Apps
// it will contain category id
// assigned games by default to avoid null, but will be changed


router.get("/:choice", (request, response,next) => {

    // First get the choice, whether the user wants 
    // applications or games
    // it changes everything
    let CHOICE = request.params.choice;
    // choice can be games, or apps, otherwise send 400

    if(CHOICE === "games"){
        CATEGORY = GAMES;
    }
    else if(CHOICE === "apps"){
        CATEGORY = APPS;
    }
    else{
        /*
            send bad request to the user
            because choice can be either games or apps
        */
        const BAD_REQUEST = 400;
        return response.status(BAD_REQUEST).send("Charts of ONLY Apps or Games can be desired. Please enter a valid choice.");
    }

    // Get the date of today in the desired format
    let TODAY = today();

    MARKET = "ios";
    COUNTRY = "US";
    TODAY = "2021-04-30";
    let TIME_THRESHOLD = 1616630401000;

    // Create the request body data
    // will be in JSON
    var requestBodyJSON = requestBody(TODAY, COUNTRY, MARKET, CATEGORY, LIMIT);
    
     /* NOW MAKE THE HTTP REQUEST TO APP ANNIE API */

    axios({
        method: "POST",
        url: theURL,
        headers: {
          "content-type": CONTENT_TYPE,
          "cookie": COOKIE,
          "origin": ORIGIN
        },
        data: requestBodyJSON,
    })
    .then(result => {
        /*
            first take this http response,
            and parse it into Products array
        */
        var allProducts = parseResponseIntoObjects(result);
        // array of "product" objects
        
        /*
            Now filter these products in terms of first_release_date
            we want recent apps / games
        */
        
        var recentProducts = filteredProductsBasedOnRecency(allProducts, TIME_THRESHOLD);
        // now they are filtered based on recency

        /*
            ONE MORE THING
            If the desired choice is APPS, 
            filter games from apps
        */

        recentProducts = filterGamesFromApps(recentProducts, CHOICE);
        // if your choice is games, it won't do anything.

        /* RETURN YOUR RESULTS */

        const SUCCESS = 200;
        return response.status(SUCCESS).send(recentProducts);
      
    })
    .catch(error => {
        /* in case of we could not reach the api */
        const SERVER_ERROR = 500;
        console.error("error in http request to app annie api", error);
        response.status(SERVER_ERROR).send("Could not reach to the App Annie API");
          
    });


});

// Export this router object
module.exports = router;