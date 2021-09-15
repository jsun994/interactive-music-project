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


var api = function(val) {
	fetch("https://genius.p.rapidapi.com/search?q=", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "genius.p.rapidapi.com",
		"x-rapidapi-key": "b0955a5cf0msh85a6f596e0511d6p1965f0jsn260a9f2c67e0"
	}
    })
	.then(function(response) {
		//console.log(response);
		if (response.ok) {
    		response.json().then(function(apiData) {
				console.log(apiData);
			
				if (apiData.data.length!= 0) {
					if (document.querySelector("#resList")) {
						document.querySelector("#resList").remove();
					}
					if (document.querySelector("#reList")) {
						document.querySelector("#reList").remove();
					}
					save(val);
					load();
					displayRes(apiData);
				} else {modalEl.classList.add("is-active");}
			})
		} else {modalEl.classList.add("is-active");}
	})
};
var displayRes = function(apiData) {
	
	var list = document.createElement("div");
	list.setAttribute("id", "resList");
    resultsEl.append(list);

	for (var i = 0; i < apiData.data.length; i++) {
		var resItem = document.createElement("a");
		resItem.innerHTML = apiData.data[i].title + " - " + apiData.data[i].album.title + " - " + apiData.data[i].artist.name;
    	resItem.className = "res";
    	resItem.setAttribute("href", apiData.data[i].preview);
    	resItem.setAttribute("target", "_blank");
		list.append(resItem);
	}
};
clearSongEl.addEventListener("click", songGone)
searchNowEl.addEventListener("click", api)