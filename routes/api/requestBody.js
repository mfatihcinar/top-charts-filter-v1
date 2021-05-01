/*
    This functionality, function, will create
    request-body JSON data for us.
    Given parameters:
        DATE: date of the search, i.e. TODAY
                will be a string
        COUNTRY_CODE: TR,US, etc.
        MARKET: android or iOS
        CATEGORY_ID: id of the category, 
                        100001 for games
                        100000 for all apps
        LIMIT: maximum of the search
               default 400
*/



function requestBody(givenDate, givenCountry, givenMarket, givenCategory, givenLimit){
    /*
        this function will create request body with the given parameters
    */

    let DATE = givenDate;
    // type String, format "2021-04-30"
    
    let COUNTRY_CODE = givenCountry;
    // type String, format "US"

    
    let MARKET = givenMarket;
    // type String, format "ios-phone", "android-all"
    if(givenMarket == "ios"){
        MARKET = "ios-phone";
    }
    else if(givenMarket == "android"){
        MARKET = "android-all";
    }

    let CATEGORY_ID = givenCategory;
    // type int, format 100001 for games, 100000 for all apps

    let LIMIT = givenLimit;
    // type int, format 400

        let requestBodyJSON = `{
            "facets": [
                "store_product_rank_free__aggr",
                "value_change(store_product_rank_free__aggr)__aggr",
                "store_product_rank_grossing__aggr",
                "value_change(store_product_rank_grossing__aggr)__aggr"
            ],
            "filters": {
                "value_change": {
                    "span_value": 1,
                    "span_unit": "PERIOD"
                },
                "granularity": {
                    "equal": "daily"
                },
                "date": {
                    "equal": "${DATE}"
                },
                "country_code": {
                    "equal": "${COUNTRY_CODE}"
                },
                "device_code": {
                    "equal": "${MARKET}"
                },
                "category_id": {
                    "equal": ${CATEGORY_ID}
                }
            },
            "breakdowns": {
                "product_id": {}
            },
            "pagination": {
                "offset": 0,
                "limit": ${LIMIT}
            },
            "order_by": [
                {
                    "name": "store_product_rank_free__aggr",
                    "order": "asc"
                }
            ],
            "fields": {
                "product_id": {
                    "fields": [
                        "name",
                        "icon_url",
                        "publisher_id",
                        "market_code",
                        "device_code",
                        "vertical_code",
                        "is_sensitive",
                        "status",
                        "category_id",
                        "first_release_date",
                        "company_id",
                        "seller"
                    ],
                    "category_id": {
                        "fields": [
                            "name"
                        ]
                    },
                    "publisher_id": {
                        "fields": [
                            "name",
                            "company_id"
                        ],
                        "company_id": {
                            "fields": [
                                "name",
                                "country_code"
                            ]
                        }
                    }
                }
            }
        }`;

    
    return requestBodyJSON;

}

module.exports = requestBody;