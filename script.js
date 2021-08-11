var apiKey = "AIzaSyB5dgvfBLnsT72mUqKAM3YPCMpdmoD1t3I";
var generatedResults = [];
var video = document.querySelector(".video");
var container = document.querySelector(".lower-section");
var submitButton = document.querySelector(".click");
var searchBar = document.querySelector("#search-bar");
var submitComment = document.querySelector("#submit-comment");
var comment = document.querySelector("#comment");
var commentContainer = document.querySelector(".comment-section")
var commentArray = [];
var listOfVideos = document.querySelector(".list-of-videos");


submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    var searchResults = searchBar.value;
    console.log(searchResults);
    getYouTubeAPI(searchResults);
});

function getYouTubeAPI(searchTerm) {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${searchTerm}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
        console.log(data.items);
        generatedResults = data.items;
        createVideoList(generatedResults);
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
        $("<h1>").attr("class", "header").html(`${generated[i].snippet.title}`).appendTo(`#${generated[i].id.videoId}`);
        $("<div>").attr("class", "thumbnails").css("background-image", `url(${generated[i].snippet.thumbnails.medium.url})`).appendTo(`#${generated[i].id.videoId}`);
    }
}

listOfVideos.addEventListener('click', function(event) {
    var onClick = event.target.parentElement.id;
    console.log(onClick);
    $(".video").empty();
    $("<div>").attr("id", "player").appendTo(".video");
    $('html,body').scrollTop(0);
    commentContainer.classList.remove("hidden");
    onYouTubeIframeAPIReady(onClick);
})

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady(videoResult) {
    console.log(typeof videoResult);
    player = new YT.Player("player", {
        height: '450',
        width: '750',
        videoId: videoResult,
        playerVars: {
        'playsinline': 1,
        'autoplay': 0
        },
        events: {
        'onStateChange': onPlayerStateChange
        }
    });
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

localStorage.getItem("comments") ? commentArray = JSON.parse(localStorage.getItem("comments")) : null;

for (var i = 0; i < commentArray.length; i++) {
    $("<div>").addClass("comments-list").text(commentArray[i]).appendTo(".comment-section");
}

submitComment.addEventListener('click', function(event) {
    event.preventDefault();
    var newComment = comment.value;
    $("<div>").addClass("comments-list").text(newComment).appendTo(".comment-section");
    commentArray.push(newComment);
    localStorage.setItem('comments', JSON.stringify(commentArray));
})