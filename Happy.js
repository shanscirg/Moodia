
const happy = [
    "heavy is dead",
    "funny cats",
    "inspiring", ];

    const totalResponses = happy.length;
const responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
const chosenVideo = happy[responseIndex];
console.log(chosenVideo);

// for (let i= 0; i < happy.length; i++) {
//   const element = happy[1];
//   console.log(element); 
// };

if (chosenVideo === "heavy is dead") {
  var videoSelect="oiuyhxp4w9I"
  pickVideo();
  
  
} else if (chosenVideo === "funny cats") {
  var videoSelect= "Eb0qWVmpY9U";
  pickVideo();
}
  else  {
    alert("no video");
  }









//---------------------------------------Heavy is dead-----------------------//
function pickVideo() {
        var x=document.getElementById("player");
        
        } 
      //----------------------------------------------------------------// 
      
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');
      //This line is the API Key (Dont Change!)
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          //Link the video here
          videoId: videoSelect,
          events: {
            'onReady': onPlayerReady,
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
//-----------------------------------Heavy is dead-----------------------------------------------------//

