var clearSongEl = document.querySelector("#all-clear")
var searchNowEl = document.querySelector("#searchnow")

var songGone = function(event){
    event.preventDefault();
    console.log(event);
    console.log(searchNowEl)
    var recentSearch = searchNowEl.value.trim()
    console.log(recentSearch)
    if(recentSearch){
        songSearch(recentSearch)
        searchNowEl.value=""
    }else {
        alert("Are you sure you'd like to clear Recent Searches")
    }
}

var songSearch = function(axios) {
    var axios = require("axios").default;
    console.log(axios)
var options = {
    method: 'GET',
    url: 'https://genius.p.rapidapi.com/search',
    params: {q: ''},
    headers: {
    'x-rapidapi-host': 'genius.p.rapidapi.com',
    'x-rapidapi-key': 'b0955a5cf0msh85a6f596e0511d6p1965f0jsn260a9f2c67e0'
}
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
}
clearSongEl.addEventListener("click", songGone)
searchNowEl.addEventListener("click", songSearch)