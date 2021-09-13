var userFormEl = document.querySelector("#form");
var inputEl = document.querySelector("#input");
var resultsEl = document.querySelector("#results");

//handle input
var inputHandler = function(event) {
    event.preventDefault();

    var inputVal = inputEl.value.trim();

    if (inputVal) {
        api(inputVal);
        inputEl.value = "";
        
    } else {
        alert("not valid!");
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
				if (!jQuery.isEmptyObject(data)) {
					if (document.querySelector("#resList")) {
						document.querySelector("#resList").remove();
						}
						displayRes(data);
				} else {
					alert("song not found");
				}
			})
		} else {
			alert("Error: " + response.statusText);
		}
	})
};

var displayRes = function(data) {
	var list = document.createElement("div");
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

userFormEl.addEventListener("submit", inputHandler);