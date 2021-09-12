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

var songSearch = function(recentSearch) {
    
}
clearSongEl.addEventListener("click", songGone)