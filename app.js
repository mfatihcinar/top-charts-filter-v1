const express = require("express");

const app = express();
// create express instance

const PORT = 8888;

// APIs
const chartsAPIRoute = require("./routes/api/chartsAPI"); // get the router for api

// Use Body Parser
// to parse elements in Request Form
const bodyParser = require("body-parser");
// relate body parser with express server (router)
app.use(bodyParser.urlencoded({extended: false}));


// Using API Routers
app.use("/api/charts", chartsAPIRoute);

const server = app.listen(process.env.PORT || PORT, () => {
    console.log("Server is working on PORT " + PORT);
});

app.get("/", (request, response, next) => {

    const OKAY = 200;
    response.status(OKAY).send("Server is ON! :)");
}); 