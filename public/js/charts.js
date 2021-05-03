
$( document ).ready(function() {
   
    let container = $(".container.applicationsContainer");

    $("#loadChartsButton").click(function() {
        
        let chosenCountry = $("#selectCountry").val(); // desired country
        let chosenMarket = $("#selectMarket").val(); // desired market, play store or app store
        let chosenType = $("#selectType").val(); // desired type, game or app
        let chosenTimeThreshold = $("#timeThreshold").val(); // desired threshold
        let chosenLimit = $("#limit").val();

        if(!chosenLimit){
            // if no limit is given
            chosenLimit = 200; // make it 200 
        }

        // Calculate the time threshold

        chosenTimeThreshold = new Date().getTime() - chosenTimeThreshold;

        $.ajax({
            url: 'api/charts',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            data: {"country": chosenCountry, 
                    "limit": chosenLimit,
                    "platform": chosenMarket, 
                    "type": chosenType, 
                    "timeThreshold": chosenTimeThreshold},
            success: function(response){console.log(response);
                
                renderProducts(response, container);
            }
        });
    
    });

    /*

    $.ajax({
        url: 'api/charts',
        type: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        data: {"country": "US", "limit": "300", "platform": "ios", "type": "games", "timeThreshold": "1616630401000"},
        success: function(response){console.log(response);
            
            renderProducts(response, container);
        }
    });

    */

    

});


function renderProducts(products, container){
    /*
        this function will render products that are coming from server
        to the front-end in a way that is desired
    */

    // First flush the container
    container.html(""); // make it empty

    // There might be NO PRODUCTS 

    if(products.length == 0){
        // no products
        const NO_PRODUCTS_TEXT = "nothing to show";
        container.append(`<span class = 'nothingToShow'>${NO_PRODUCTS_TEXT}</span>`);
        return;
    }

    // There are products
    // render products one by one

    products.forEach( product => {
        
        let renderedHTML = createProductHTML(product);
        // get the HTML code
        container.append(renderedHTML);
        // append this to the container
    });

    return;    
}


