/*
    This functionality will provide 
    the date of today based on desired format
    "YEAR-MONTH-DAY"
*/

// Require dateformat because we want to format the date
const dateFormat = require('dateformat');

// var day=dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

function today(){

    let now = Date.now();
    // time of this very second in miliseconds

    let formatted = dateFormat(now, "yyyy-mm-dd");
    // the date of today in the desired format

    return formatted;

}

module.exports = today;