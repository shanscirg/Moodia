//SPOTIFY
//Oauth token BQAqs7-1OEVaI2_8l0vKmIOQxCr4BN35Y4GxewWyPmRQzisItDZqWZWPm9VbblJIGHIPSR7lhf_XaU7XM1cjlFuCvafg3Nktci0v9LDfU3XQHObOqqqRnZLzdPi7-4at8x6TdLzZAbUUUoiYc_4sTg
//happy mood playlist spotify URI: spotify:playlist:0kWycnqEfYA31P87pJBtA8
//spotify object model: https://developer.spotify.com/documentation/web-api/reference/object-model/

// const request = require("request");
// const user_id = "shannon";
// const token = "Bearer "
// const playlists_url = "https://api.spotify.com/v1/users/" + user_id + "/playlists"

// request({ url: playlists_url, headers: { "Authorization": token } }, function (err, res) {
//     if (res) {
//         const playlists = JSON.parse(res.body);
//         const playlist_url = playlists.items[0].href
//         request({ url: playlist_url, headers: { "Authorization": token } }), function (err, res) {
//             if (res) {
//                 const playlist = JSON.parse(res.body);
//                 console.log("playlist: " + playlist.name);
//                 playlist.tracks.forEach(function (track) {
//                     console.log(track.track.name);
//                 });
//             }
//         }
//     }
// })


// love shack id = spotify:track:4W4wYHtsrgDiivRASVOINL

// function myFunction(moodSongs) {
//     for (let i = 0; i < moodSongs.length; i++) {
//         const songID = moodSongs[i];
//     }
// }

// const happySongs = {
//     LoveShack: "4W4wYHtsrgDiivRASVOINL",
//     Happy: "60nZcImufyMA1MKQY3dcCH",
//     ComeOnEileen: "6tmslRyHPI7dyTe8rAHcbQ",
//     JustLikeFire: "7K5dzhGda2vRTaAWYI3hrb",
//     ImWalkingonSunshine: "6mht0HfWSayOESGoaXEShd"
// }
$(document).ready(function(){
    $("button").on("click", function () {
        const mood = $(this).attr("data-mood");
        displayMusicInfo(mood);
    })
})
function displayMusicInfo(mood) {
    const songsArray = [
        {
            musicMood: "Happy",
            // song IDs for Love Shack, Happy, Come On Eileen, Just Like Fire, and Walking On Sunshine
            choices: ["4W4wYHtsrgDiivRASVOINL", "60nZcImufyMA1MKQY3dcCH", "6tmslRyHPI7dyTe8rAHcbQ", "7K5dzhGda2vRTaAWYI3hrb", "6mht0HfWSayOESGoaXEShd"]
        },
        {
            musicMood: "Sad",
            choices: []
        },
        {
            musicMood: "Angry",
            choices: []
        },
        {
            musicMood: "Silly",
            choices: []
        },
        {
            musicMood: "Festive",
            choices: []
        }
    ]
    let song = $(this).attr("data-name");
    for (let i = 0; i < songsArray.length; i++) {
        if (mood === songsArray[i].musicMood) {
            var randomNum = Math.floor(Math.random() * 5)
            song = songsArray[i].choices[randomNum];
        }
    }
    console.log(song);

    const getTracksURL = "https://api.spotify.com/v1/tracks?ids=" + song + "&market=US"
    $.ajax({
        url: getTracksURL,
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer BQAqs7-1OEVaI2_8l0vKmIOQxCr4BN35Y4GxewWyPmRQzisItDZqWZWPm9VbblJIGHIPSR7lhf_XaU7XM1cjlFuCvafg3Nktci0v9LDfU3XQHObOqqqRnZLzdPi7-4at8x6TdLzZAbUUUoiYc_4sTg"
        }
    }).then(function (response) {
        console.log(response);
    })

}




// const sadSongs = []
// const angrySongs = []
// const sillySongs = []
// const festiveSongs =[]
// // const mood = $(this).attr("data-mood");
// const getTracksURL = "https://api.spotify.com/v1/tracks?ids=4W4wYHtsrgDiivRASVOINL&market=US&"

// $.ajax({
//     url: getTracksURL,
//     method: "GET",
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: "Bearer BQCv7xiYuCVfUwkVab2t3ghroRjfdjKq9V8RMISCo4l9Heh-Lf32EiJ0reYpgBoiho2SxgFWF3c7_OdvwxNid9ykG3dNSLRqJhw6uU3KoWz5CFiRFHR_5lJ0glwbKFwfRWWt1VvjKZKmIkP9vVlsyQ"
//     }
// }).then(function (response) {
//     console.log(response);
// })
// })


//musicovery!!!!!!!!! http://musicovery.com/api/V6/doc/documentation.php#playlist_tag
// go down to 'Playlist: get from a tag' and go down to  'Playlist from mood coordinates (valence, arousal)'

// let valence = 0
// let arousal = 0

// click mood 
// $("button").on("click", function () {
//     const mood = $(this).attr("data-mood");
// if (mood == "Happy") {
//     valence = 900000;
//     arousal = 400000;
// } else if (mood == "Angry") {
//     valence = 330000;
//     arousal = 900000;
// } else if (mood == "Sad") {
//     valence = 100000;
//     arousal = 100000;
// } else {
//     valence = 900000;
//     arousal = 200000;
// }

// const musicoveryURL = "http://musicovery.com/api/V6/playlist.php?&fct=getfrommood&trackvalence=" + valence + "&trackarousal=" + arousal
//     const musicoveryURL = "http://musicovery.com/api/V6/playlist.php?&fct=getfrommood&trackvalence=900000&trackarousal=400000&listenercountry=us"

//     $.ajax({
//         url: musicoveryURL,
//         method: "GET"
//     }).then(function (response) {
//         console.log(JSON.stringify(response));
//     })

// });


// more music apis:
// https://musicmachinery.com/music-apis/



// // click mood and have GIF appear
// $("button").on("click", function () {
//     // In this case, the "this" keyword refers to the button that was clicked
//     const mood = $(this).attr("data-mood");

//     // Constructing a URL to search Giphy for the mood
//     const queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//         mood + "&api_key=dc6zaTOxFJmzC&limit=10";

//     // Performing our AJAX GET request
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     })
//         // After the data comes back from the API
//         .then(function (response) {
//             // Storing an array of results in the results variable
//             const results = response.data;

//             // Looping over every result item
//             for (let i = 0; i < results.length; i++) {

//                 // Only taking action if the photo has an appropriate rating
//                 function getGif() {

//                     // Creating a div for the gif
//                     const gifDiv = $("<div>");

//                     // Creating an image tag
//                     const moodImage = $("<img>");

//                     // Giving the image tag an src attribute of a property pulled off the
//                     // result item
//                     moodImage.attr("src", results[i].images.fixed_height.url);

//                     // Appending the moodImage we created to the "gifDiv" div we created
//                     gifDiv.append(moodImage);

//                     // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
//                     $("#gifs-appear-here").prepend(gifDiv);
//                 }
//                 getGif();
//             }
//         })
// })
