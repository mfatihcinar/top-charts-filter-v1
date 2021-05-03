function createProductHTML(product){
    /*
        This function will create HTML code for this product
        i.e. Render this product
    */

    let productID = product.ID;
    // product ID, will be used to link to AppAnnie

    let appAnnieProductURL = `https://www.appannie.com/apps/ios/app/${productID}/details?granularity=daily&country=US&country_code=US`;
    // whenever clicked, redirect to this page
    
    let companyID = product.companyID;
    // go get the company ID

    let appAnniePublisherURL = `https://www.appannie.com/company/${companyID}`;
    // whenever clicked to the publisher, redirect to this page
    

    // Calculate the time-stamp for this product
    // In human-like time
    let datePublished = new Date(product.firstReleaseDate);

    let month = datePublished.getMonth(); // get month data
    let day = datePublished.getDay(); // get day data
    let year = datePublished.getFullYear(); // get year data

    let dateString = `${year}-${month}-${day}`;
    // this is the desired format for rendering

    return `<div class="container applicationsContainer">
                <div class="card mb-5">
                    <div class="productContainer row no-gutter">
                        <div class="col-3">
                            <div class="imageContainer">
                                <img src=${product.iconURL} alt="image-of-${product.name}" class="src" width= 100%/>
                            </div>
                        </div>
                        <div class="contentContainer">
                            <a href="${appAnnieProductURL}" class="href">
                                <span class="appTitle">#${product.name}</span>
                            </a>
                            <a href="${appAnniePublisherURL}" class="href">
                                <span class="appPublisher">${product.publisherName}</span>
                            </a>
                            <span class="appRank">Rank: ${product.rank}</span>
                            <span class="appReleaseDate">Release Date: ${dateString}</span>
                        </div>
                    </div>
                </div>
            </div>`;  
}