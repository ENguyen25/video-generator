var apiKey = "AIzaSyB5dgvfBLnsT72mUqKAM3YPCMpdmoD1t3I";
var generatedResults = [];
var video = document.querySelector(".video");
var container = document.getElementById(".container")
var submitButton = document.querySelector(".click");
var searchBar = document.querySelector("#search-bar");
var listOfVideos = document.querySelector(".list-of-videos");

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    // location.href = "index2.html";
    var searchResults = searchBar.value;
    console.log(searchResults);
    getYouTubeAPI(searchResults);
});

function getYouTubeAPI(searchTerm) {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=${searchTerm}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
        console.log(data.items);
        generatedResults = data.items;
        createVideoList(generatedResults);
        // onYouTubeIframeAPIReady(generatedResults);
    });
}

function createVideoList(generated) {
    $(".list-of-videos").empty();
    console.log(generated)
    for (var i = 0; i < generated.length; i++) {
        $("<div>").attr(
            {
                id: generated[i].id.videoId,
                class: "video-results",
            }
        ).appendTo(".list-of-videos");
        $("<h1>").attr("class", "header").text(`${generated[i].snippet.title}`).appendTo(`#${generated[i].id.videoId}`);
        $("<div>").attr("class", "thumbnails").css("background-image", `url(${generated[i].snippet.thumbnails.medium.url})`).appendTo(`#${generated[i].id.videoId}`);
    }
}

listOfVideos.addEventListener('click', function(event) {
    var onClick = event.target;
    console.log(onClick);
})

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady(results) {
    console.log(results);
    for (var i = 0; i < results.length; i++) {
        player = new YT.Player(`player${i}`, {
            height: '335',
            width: '550',
            videoId: results[i].id.videoId,
            playerVars: {
            'playsinline': 1,
            'autoplay': 0
            },
            events: {
            'onStateChange': onPlayerStateChange
            }
        });
    }
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
}
}

function stopVideo() {
player.stopVideo();
}

