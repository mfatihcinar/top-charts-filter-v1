/*
    This functionality will filter games from apps
    based on the desired choice
*/

const GAME_CATEGORY_ID = "100001";

const filterGamesFromApps = function(products, CHOICE){
    /*
        This function will filter games from apps
        based on the desired choice
    */

    if(CHOICE == "games"){
        /*
            if the user want to get games
            do not filter games
            just don't do anything
        */
       return products;
    }
    else{
        /*
            remove games from the list
        */
        
        var withoutGames = [];
        // apps will be stored here

        var iterator;
        // iterate on the products

        var oneProduct;
        // take one of the products in the list in order to process

        for(iterator = 0; iterator < products.length; iterator++){

            oneProduct = products[iterator];
            // take this element in the list for processing

            if(oneProduct.category == GAME_CATEGORY_ID){
                // if this is a game
                // forget about this
                continue;
           
            }
            else{
                // if this is an app
                // take it with you
                withoutGames.push(oneProduct);
                // take this product
            }

        }

        return withoutGames;
    }

};

module.exports = filterGamesFromApps;