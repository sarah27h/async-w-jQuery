/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                Authorization : 'Client-ID 6848393ef35f14ceb6144b50f64dbb648d8c3ab42dcbc7cb0f7166272a6be16f'
            }
            
        }).done(addImage)
        .fail(function(err) {
            requestError(err, 'image');
        });

        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=1e0ab37e04414890978247cb882dd85a`
            
        }).done(addArticles)
        .fail(function(err) {
            requestError(err, 'articles');
        });
       
    });

    function addImage(data){
        let htmlConent = '';
        
        if(data && data.results && data.results[0]) {
            const firstImage = data.results[0];
        htmlConent = `<figure>
            <img src="${firstImage.urls.regular}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.username}</figcaption>
        </figure>`
        console.log(firstImage);
        
        } else {
            htmlConent = `<div class="error-no-image"> No images aviable</div>`
        }

        responseContainer.insertAdjacentHTML('afterbegin', htmlConent);
        
    }

    function addArticles(data){
        let htmlConent = '';
        // debugger;
        if(data && data.response.docs && data.response.docs.length > 1) {
            for(let i=0; i< data.response.docs.length; i++){
                const article = data.response.docs[i];
                htmlConent = `<article class="article">
                        <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                        <p>${article.snippet}</P>
                        
                        <p>Source: ${article.source}</p>
                        
            </article>
            `
            // <p>${article.byline.original}</p>
            responseContainer.insertAdjacentHTML('beforeend', htmlConent);
                // console.log(article);
            }
        
        } else {
            // console.log(article);
            htmlConent = `<div class="error-no-articles"> No article aviable</div>`
        }
 
    }

    function requestError(e, part) {
        console.log(e);
        responseContainer.insertAdjacentHTML('beforeend', `<p class="error-no-image"></p>`);
    }

})();
