var userFormEl = document.querySelector("#form");
var inputEl = document.querySelector("#input");
var resultsEl = document.querySelector("#results");

//handle input
var inputHandler = function(event) {
    event.preventDefault();

    var inputVal = inputEl.value.trim();

    if (inputVal) {
		//console.log(inputVal);
        api(inputVal);
        inputEl.value = "";
        
    } else {
        alert("not valid!");
    }
};

var api = function(val) {
	fetch("https://shazam.p.rapidapi.com/search?term=" + val, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "shazam.p.rapidapi.com",
			"x-rapidapi-key": "2eba6a7cffmsh74d3bc58b3229c1p11d82fjsn2bc3b902cbfc"
		}
	})
	.then(function(response) {
		//console.log(response);
		if (response.ok) {
    		response.json().then(function(data) {
				console.log(data);
				if (!jQuery.isEmptyObject(data)) {
					//if result list already exists, remove it
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
	//console.log(data.artists.hits.length);
	//console.log(data.tracks.hits.length);
	var list = document.createElement("div");
	list.setAttribute("id", "resList");
    resultsEl.append(list);

	for (var i = 0; i < data.tracks.hits.length; i++) {
		var resItem = document.createElement("a");

		resItem.innerHTML = data.tracks.hits[i].track.share.subject;
    	resItem.className = "res";
    	resItem.setAttribute("href", data.tracks.hits[i].track.url);
    	resItem.setAttribute("target", "_blank");
		
		list.append(resItem);
	}
};

userFormEl.addEventListener("submit", inputHandler);