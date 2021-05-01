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


const router = express.Router();

// THERE IS NO VIEW 
// BECAUSE THIS ROUTER / SERVER DOES NOT SERVE HTML PAGE

// Get the cookie from the data folder, we will use it in http request
const COOKIE = require("../../data/cookie");
// Get the origin information from the data folder, we will use it in http request
const ORIGIN = require("../../data/origin");


router.get("/", (request, response,next) => {
    console.log("Hi");
    response.status(200).send("selam");
});

// Export this router object
module.exports = router;