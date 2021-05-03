/*
    This functionality will parse HTTP Response
    into desired PRODUCT JavaScript Objects
*/

const parseResponseIntoObjects = function(results){
    /*
        this function parses http response into Product objects
        in the desired form
        does not care about whether it is game or application
        does not care about date
    */  
    

    var all = [];
    // all of the products will be stored in this array



    /*
        iterate on the most trending products
    */
    var trendingProducts = results.data.data.facets;
    // the trending apps in the reponse
    var allInformationRaw = results.data.data.dimensions;
    // all the information we want about the products/companies/publishers is stored here
    // it is raw

    var iterator; // iterate in response
    for(iterator = 0; iterator < trendingProducts.length; iterator++){
        /* iterate on the trending products */

        var productID = trendingProducts[iterator].product_id;
        var productName = allInformationRaw.product_id[productID].name;
        var productRank = trendingProducts[iterator].store_product_rank_free__aggr;
        var productReleaseDate = allInformationRaw.product_id[productID].first_release_date;
        var productIconURL = allInformationRaw.product_id[productID].icon_url;
        var productCategoryID = allInformationRaw.product_id[productID].category_id;
        var productPublisherID = allInformationRaw.product_id[productID].publisher_id;
        var productCompanyID = allInformationRaw.product_id[productID].company_id;
       
        var productPublisherName; // it might be null
        try {
            productPublisherName =
            allInformationRaw.publisher_id 
                && allInformationRaw.publisher_id[productPublisherID].name;
          } catch (exception) {
            productPublisherName = "no name";
          }
        //var productPublisherName = allInformationRaw.publisher_id[productPublisherID].name;
        
        
        // Create PRODUCT Object based on the information you have
        var product = 
            {
                ID: productID, 
                name: productName,
                rank: productRank,
                firstReleaseDate: productReleaseDate,
                iconURL: productIconURL,
                category: productCategoryID,
                publisherID: productPublisherID,
                publisherName: productPublisherName,
                companyID: productCompanyID
            };

        all.push(product);
        // add this application into the array
        
    }


    return all;
    // Return all the parsed products

};

module.exports = parseResponseIntoObjects;