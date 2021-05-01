/*
    This functionality will filter products
    based on how recent they are
    Takes [Products]
          [Threshold]
    and filters products that are not produced recently
*/

const filteredProductsBasedOnRecency = function(products, timeThreshold){
    /*
        this function will filter products based on recency
        time threshould will be in miliseconds
        and will filter out old ones
    */

    var iterator; // iterator for iterating on products

    var recentProducts = [];
    // recent products will be stored

    var oneProduct; // representing a product in list

    for(iterator = 0; iterator < products.length; iterator++){

        oneProduct = products[iterator];
        // take this element in the list for processing

        if(oneProduct.firstReleaseDate >= timeThreshold){
            // if this product is RECENT
            recentProducts.push(oneProduct);
            // take this product
        }
        else{
            continue;
        }
    }

    return recentProducts;
}


module.exports = filteredProductsBasedOnRecency;