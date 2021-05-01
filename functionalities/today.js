/*
    This functionality will provide 
    the date of today based on desired format
    "YEAR-MONTH-DAY"
*/

// Require dateformat because we want to format the date
const dateFormat = require('dateformat');


function today(){

    let yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000); // in ms
    // today's information might not be on the website
    // so we calculate yesterday for today actually

    let formatted = dateFormat(yesterday, "yyyy-mm-dd");
    // the date of today in the desired format

    return formatted;

}

module.exports = today;