var userFormEl = document.querySelector("#form");
var inputEl = document.querySelector("#input");
var resultsEl = document.querySelector("#results");
var modalEl = document.querySelector("#modal");
var closeEl = document.querySelector("#close");

//handle input
var inputHandler = function(event) {
    event.preventDefault();
    var inputVal = inputEl.value.trim();
    if (inputVal) {
        api(inputVal);
        inputEl.value = "";
        
    } else {
		modalEl.classList.add("is-active");
    }
};

var api = function(val) {
	fetch("https://unsa-unofficial-spotify-api.p.rapidapi.com/search?query=" + val + "&type=playlists", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "unsa-unofficial-spotify-api.p.rapidapi.com",
			"x-rapidapi-key": "2eba6a7cffmsh74d3bc58b3229c1p11d82fjsn2bc3b902cbfc"
		}
	})
	.then(function(response) {
		//console.log(response);
		if (response.ok) {
    		response.json().then(function(data) {
				console.log(data);

				if (data.Results != "No results Found") {
					if (document.querySelector("#resList")) {
						document.querySelector("#resList").remove();
					}
					displayRes(data);
				} else {
					modalEl.classList.add("is-active");
				}
			})
		} else {
			modalEl.classList.add("is-active");
		}
	})
};

var displayRes = function(data) {
	
	var list = document.createElement("div");
	list.setAttribute("id", "resList");
    resultsEl.append(list);

	for (var i = 0; i < data.Results.length; i++) {
		var resItem = document.createElement("a");
		resItem.innerHTML = data.Results[i].name;
    	resItem.className = "res";
    	resItem.setAttribute("href", data.Results[i].external_urls.spotify);
    	resItem.setAttribute("target", "_blank");
		
		list.append(resItem);
	}
};

var modalHandler = function(event) {
	modalEl.classList.remove("is-active");
	
	if (document.querySelector("#resList")) {
		document.querySelector("#resList").remove();
	}
}

userFormEl.addEventListener("submit", inputHandler);
closeEl.addEventListener("click", modalHandler);