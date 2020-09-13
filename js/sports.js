window.addEventListener("load", async (e) => {
    var searchResult = document.querySelector("#searchResult");

    let response = await fetch(`https://gnews.io/api/v3/topics/sports?token=cf902523c81401eec78c363210e7755c&max=100`);
    console.log(response)

    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        var json = await response.json();
    } else {
        alert("HTTP-Error: " + response.status);
    }

    searchResult.innerHTML = ""

    console.log(json)
    var returnedNews
    returnedNews = document.createElement('ul');
    returnedNews.innerHTML = `<div class="col-6 offset-3">
    <h2 class="text-center">Top Sports News</h2>
</div>`
    json.articles.forEach(element => {
        returnedNews.innerHTML += `
    <div class="card mb-5">
            <img width = "50%" height="50%" class="card-img-top" src="${element.image ? element.image : "https://capbridge.sg/wp-content/themes/ryse/assets/images/no-image/No-Image-Found-400x264.png"}" alt="Card image cap">
            <h5 class="card-header">Featured</h5>
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.description}</p>
              <a href="${element.url}" class="btn btn-primary">View article</a>
            </div>
          </div>`;
    });
    searchResult.appendChild(returnedNews);
})

var queryBox = document.querySelector("#newsSearch");

queryBox.addEventListener("keypress", async (e) => {
    if (e.key == "Enter") {
        console.log(e.target.value)
        console.log("searched")

        var searchResult = document.querySelector("#searchResult");

        let response = await fetch(`https://gnews.io/api/v3/search?q=${e.target.value}&token=cf902523c81401eec78c363210e7755c&max=100`);
        console.log(response)

        if (response.ok) { // if HTTP-status is 200-299
            // get the response body (the method explained below)
            var json = await response.json();
        } else {
            alert("HTTP-Error: " + response.status);
        }

        searchResult.innerHTML = ""

        console.log(json)
        var returnedNews
        returnedNews = document.createElement('ul');
        json.articles.forEach(element => {
            returnedNews.innerHTML += `<div class="card mb-5">
            <img width = "50%" height="50%" class="card-img-top" src="${element.image ? element.image : "https://capbridge.sg/wp-content/themes/ryse/assets/images/no-image/No-Image-Found-400x264.png"}" alt="Card image cap">
            <h5 class="card-header">Featured</h5>
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.description}</p>
              <a href="${element.url}" class="btn btn-primary">View article</a>
            </div>
          </div>`;
        });
        searchResult.appendChild(returnedNews);
        e.target.value = ""
    }
})

