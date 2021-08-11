var dailymotionResults = [];
var dmSearch = document.querySelector("#dm-search");
var dailymotionButton = document.querySelector(".dm-submit");

DM.init({
    apiKey: 'dm_d914a45aaa5ad7391407dc0e50d3e172',
    status: true, // check login status
    cookie: true // enable cookies to allow the server to access the session
});

dailymotionButton.addEventListener('click', function(event) {
    event.preventDefault();
    var dmResults = dmSearch.value;
    console.log(dmResults);
    getDailymotion(dmResults);
});

function getDailymotion(searchTerm) {
    console.log(searchTerm)
    fetch(`https://api.dailymotion.com/videos?fields=thumbnail_480_url%2Ctitle%2Cid&limit=15&search=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
        console.log(data.list);
        dailymotionResults = data.list;
        createVideoList(dailymotionResults);
    });
}

function createVideoList(resultsList) {
    $(".dailymotion-videos").empty();
    console.log(resultsList)
    for (var i = 0; i < resultsList.length; i++) {
        $("<div>").attr(
            {
                id: resultsList[i].id,
                class: "video-results",
            }
        ).appendTo(".dailymotion-videos");
        $("<h1>").attr("class", "header").html(`${resultsList[i].title}`).appendTo(`#${resultsList[i].id}`);
        $("<div>").attr("class", "thumbnails").css("background-image", `url(${resultsList[i].thumbnail_480_url})`).appendTo(`#${resultsList[i].id}`);
    }
}

function dailymotionPlayer() {
    var player = DM.player(document.getElementById("player"),{ 
        video: "x7tgad0", 
        width: "200", 
        height: "450", 
        params: { 
            autoplay: true, 
            mute: true 
        } 
    }); 
}