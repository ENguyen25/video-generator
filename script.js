var apiKey = "AIzaSyBWa3fPm93dB1MhTPCKsvnKOCSeR99SNdA";
var generatedResults = [];

fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=cats&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
    console.log(data.items);
    generatedResults = data.items;
    console.log(data.items[2].id.videoId);
    onYouTubeIframeAPIReady(generatedResults);
});

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady(results) {
    for (var i = 0; i < results.length; i++) {
        player = new YT.Player(`player${i}`, {
            height: '390',
            width: '640',
            videoId: results[i].id.videoId,
            playerVars: {
            'playsinline': 1
            },
            events: {
            'onReady': onPlayerReady,
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

