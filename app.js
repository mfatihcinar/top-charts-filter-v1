const express = require("express");

const app = express();
// create express instance

const PORT = 8888;

const server = app.listen(process.env.PORT || PORT, () => {
    console.log("Server is working on PORT " + PORT);
});

app.get("/", (request, response, next) => {

    const OKAY = 200;
    response.status(OKAY).send("Server is ON! :)");
}); 