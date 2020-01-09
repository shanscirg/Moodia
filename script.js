//SPOTIFY
//Oauth token BQC0uhBNoJsFv353zWf9ByFQQNEJmJoxrMz5cREKYcukYs3t5Fepg-R1fSbDD9Cg2kXnuynxC-3LeLccNemi0rGj1N8j16lPPHyp6kaBLUqpAW3PkDqtcIWP2Riwo0p2XY-ianTTzGewWGrWrV6SMA

//happy mood playlist spotify URI: spotify:playlist:0kWycnqEfYA31P87pJBtA8

//spotify object model: https://developer.spotify.com/documentation/web-api/reference/object-model/


$(document).ready(function () {
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
            // song IDs for Say Something, Creep, Mad World, Fade Into You, Summertime Sadness
            choices: ["6Vc5wAMmXdKIAM7WUoEb7N", "6b2oQwSGFkzsMtQruIWm2p", "3JOVTQ5h8HGFnDdp4VT3MP", "1LzNfuep1bnAUR9skqdHCK", "2dBwB667LHQkLhdYlwLUZK"]
        },
        {
            musicMood: "Angry",
            // song IDs for Break Stuff, I Hate Everything About You, Down with the Sickness, Bodies, Prison Song
            choices: ["5cZqsjVs6MevCnAkasbEOX", "6rUp7v3l8yC4TKxAAR5Bmx", "40rvBMQizxkIqnjPdEWY1v", "7CpbhqKUedOIrcvc94p60Y", "3AwLxSqo1jOOMpNsgxqRNE"]
        },
        {
            musicMood: "Silly",
            // song IDs for White & Nerdy, Itsy-Bitsy Teeny-Weeny Yellow Polka Dot Bikini, F.U.N. Song, Axel F, Barbie Girl
            choices: ["60R2v9lheAu3lwZwAFxMZK", "3B3jI9LaQyOwrtjdlnNOw0", "0gdLTqxAY4DDUQxXzmwj1z", "2Ea1iuiNtpR9BcFlQYRE5d", "2RSOzvKUnfDDrb2nQPfpQU"]
        },
        {
            musicMood: "Festive",
            // song IDs for Grandma Got Run Over by a Reindeer, All I Want for Christmas is You, Monster Mash, Thriller, It's the Most Wonderful Time of the Year
            choices: ["49iHYFjT5yO6WEw6KerX9o", "0bYg9bo50gSsH3LtXe2SQn", "0xxZY5C9xxij3D1HkzbnfC", "7azo4rpSUh8nXgtonC6Pkq", "5hslUAKq9I9CG2bAulFkHN"]
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
            Authorization: "Bearer BQC0uhBNoJsFv353zWf9ByFQQNEJmJoxrMz5cREKYcukYs3t5Fepg-R1fSbDD9Cg2kXnuynxC-3LeLccNemi0rGj1N8j16lPPHyp6kaBLUqpAW3PkDqtcIWP2Riwo0p2XY-ianTTzGewWGrWrV6SMA"
        }
    }).then(function (response) {
        console.log(response);
        // Creating a div to hold the song
        const songDiv = $("<div class='songDiv'>");

        // Storing the title
        const title = response.tracks["0"].name;
        // Creating an element to have the title displayed
        console.log(title);
        const pOne = $("<p>").text("Title: " + title);
        // Displaying the title
        songDiv.append(pOne);

        // Storing the artist
        const artist = response.tracks["0"].artists["0"].name;
        // Creating an element to have the artist displayed
        const pTwo = $("<p>").text("Artist: " + artist);
        // Displaying the artist
        songDiv.append(pTwo);

        // Storing the album
        const album = response.tracks["0"].album.name;
        // Creating an element to have the album displayed
        const pThree = $("<p>").text("Album: " + album);
        // Displaying the album
        songDiv.append(pThree);

        // Append song link
        const songURL = response.tracks["0"].external_urls.spotify;
        const link = $("<p><a title='songlink' href='" + songURL + "'>" + 'Click here to listen!' + "</a></p>");
        songDiv.append(link);

        // Retrieving the URL for the album image
        const imageURL = response.tracks["0"].album.images["0"].url;
        const albumImage = $("<img>").attr("src", imageURL);
        //Displaying the albumImage
        songDiv.append(albumImage);

        // Add each song's info to the songs-view div (and replace previous song info)
        $("#songs-view").html(songDiv);

    })

}


// click mood and have GIF appear
$("button").on("click", function () {
    // In this case, the "this" keyword refers to the button that was clicked
    const mood = $(this).attr("data-mood");

    // Constructing a URL to search Giphy for the mood
    const queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        mood + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
            // Storing an array of results in the results variable
            const results = response.data;

            // Looping over every result item
            for (let i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                function getGif() {

                    // Creating a div for the gif
                    const gifDiv = $("<div>");

                    // Creating an image tag
                    const moodImage = $("<img>");

                    // Giving the image tag an src attribute of a property pulled off the
                    // result item
                    moodImage.attr("src", results[i].images.fixed_height.url);

                    // Appending the moodImage we created to the "gifDiv" div we created
                    gifDiv.append(moodImage);

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#gifs-appear-here").prepend(gifDiv);
                }
                getGif();
            }
        })
})
