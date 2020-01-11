$(document).ready(function() {
	// console.log(moment);
	$('#sad').on('mouseover', function() {
		$('#body').removeClass();
		$('body').fadeIn('slow').attr('class', 'sad');
	});
	$('#angry').on('mouseover', function() {
		$('#body').removeClass();
		$('body').fadeIn('slow').attr('class', 'angry');
	});
	$('#silly').on('mouseover', function() {
		$('#body').removeClass();
		$('body').fadeIn('slow').attr('class', 'silly');
	});
	$('#happy').on('mouseover', function() {
		$('body').fadeIn('slow').attr('class', 'happy');
	});
	$('#festive').on('mouseover', function() {
		$('body').fadeIn('slow').attr('class', 'festive');
	});
});

//SPOTIFY
// const request = require("request");
// const user_id = "shannon";
// const token = "Bearer "
// const playlists_url = "https://api.spotify.com/v1/users/" + user_id + "/playlists"

// request({ url: playlists_url, headers: { "Authorization": token } }, function (err, res) {
//

// click mood and have GIF appear
$('button').on('click', function() {
	$('#main').hide();
	$('body').removeClass();
	// In this case, the "this" keyword refers to the button that was clicked
	const mood = $(this).attr('data-mood');
	displayMovieInfo(mood);

	// Constructing a URL to search Giphy for the mood
	const queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + mood + '&api_key=dc6zaTOxFJmzC&limit=10';

	// Performing our AJAX GET request
	$.ajax({
		url    : queryURL,
		method : 'GET'
	})
		// After the data comes back from the API
		.then(function(response) {
			// Storing an array of results in the results variable
			const results = response.data;

			// Looping over every result item
			for (let i = 0; i < results.length; i++) {
				// Only taking action if the photo has an appropriate rating
				function getGif() {
					// Creating a div for the gif
					const gifDiv = $('<div>');

					// Creating an image tag
					const moodImage = $('<img>');

					// Giving the image tag an src attribute of a property pulled off the
					// result item
					moodImage.attr('src', results[i].images.fixed_height.url);

					// Appending the moodImage we created to the "gifDiv" div we created
					gifDiv
						.append(moodImage)
						.attr('data-target', '#gifs-appear-here')
						.attr('data-slide-to', i.toString());

					// Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
					$('#gifs-appear-here').html(gifDiv);
				}
				getGif();
			}
		});
});

function displayMovieInfo(mood) {
	const moviesArray = [
		{
			movieMood : 'Happy',
			choices   : [ 
				'School of Rock', 
				'Love Actually', 
				'Forrest Gump', 
				"Ferris Bueller's Day Off", 
				'Sister Act' ]
		},
		{
			movieMood : 'Sad',
			choices   : [
				"My Sister's Keeper",
				"Hachi: A Dog's Tale",
				'The Green Mile',
				'The Pursuit of Happyness',
				'Good Will Hunting'
			]
		},
		{
			movieMood : 'Angry',
			choices   : [
				'Inglourious Basterds',
				'Texas Chainsaw Massacre',
				'Kill Bill',
				'The Accountant',
				'Django Unchained'
			]
		},
		{
			movieMood : 'Silly',
			choices   : [
				'Napoleon Dynamite',
				'Dumb and Dumber',
				'Monty Python and the Holy Grail',
				'Anchorman: The Legend of Ron Burgundy',
				'Elf'
			]
		}
	];

	let movie = $(this).attr('data-name');

	// if statement for each of the mood
	for (let i = 0; i < moviesArray.length; i++) {
		if (mood === moviesArray[i].movieMood) {
			var randomNum = Math.floor(Math.random() * 5);
			movie = moviesArray[i].choices[randomNum];
		}
	}
	console.log(movie);

	const queryURL = 'https://www.omdbapi.com/?t=' + movie + '&apikey=66fdabe8';

	// Creating an AJAX call for the specific movie button being clicked
	$.ajax({
		url    : queryURL,
		method : 'GET'
	}).then(function(response) {
		// Creating a div to hold the movie
		const movieDiv = $("<div class='movie'>");

		// Storing the rating data
		const rating = response.Rated;

		// Creating an element to have the rating displayed
		const pOne = $('<p>').text('Rating: ' + rating);

		// Displaying the rating
		movieDiv.append(pOne);

		// Storing the release year
		const released = response.Released;

		// Creating an element to hold the release year
		const pTwo = $('<p>').text('Released: ' + released);

		// Displaying the release year
		movieDiv.append(pTwo);

		// Storing the plot
		const plot = response.Plot;

		// Creating an element to hold the plot
		const pThree = $('<p>').text('Plot: ' + plot);

		// Appending the plot
		movieDiv.append(pThree);

		// Retrieving the URL for the image
		const imgURL = response.Poster;

		// Creating an element to hold the image
		const image = $('<img>').attr('src', imgURL);

		// Appending the image
		movieDiv.prepend(image);

		// Putting the entire movie above the previous movies
		$('#movies-view').html(movieDiv);
	});
}

//Oauth token BQCvcziswENRqSS4aWThKOFbJnqNf-aZ2p3PLNwDJFR-Hxkv5FK_YSgia62ehFu-DFLO0RuufC4vRKzJ9HKnMO0FI1QYp0PDpQLGlCCZer2eCMlGjw59HZMPs9hmm32uTKQtnJBsKLpoytGO2WVJ7w

//happy mood playlist spotify URI: spotify:playlist:0kWycnqEfYA31P87pJBtA8

//spotify object model: https://developer.spotify.com/documentation/web-api/reference/object-model/

$('button').on('click', function() {
	const mood = $(this).attr('data-mood');
	displayMusicInfo(mood);
});

function displayMusicInfo(mood) {
	const songsArray = [
		{
			musicMood : 'Happy',
			// song IDs for Love Shack, Happy, Come On Eileen, Just Like Fire, and Walking On Sunshine
			choices   : [
				'4W4wYHtsrgDiivRASVOINL',
				'60nZcImufyMA1MKQY3dcCH',
				'6tmslRyHPI7dyTe8rAHcbQ',
				'7K5dzhGda2vRTaAWYI3hrb',
				'6mht0HfWSayOESGoaXEShd'
			]
		},
		{
			musicMood : 'Sad',
			// song IDs for Say Something, Creep, Mad World, Fade Into You, Summertime Sadness
			choices   : [
				'6Vc5wAMmXdKIAM7WUoEb7N',
				'6b2oQwSGFkzsMtQruIWm2p',
				'3JOVTQ5h8HGFnDdp4VT3MP',
				'1LzNfuep1bnAUR9skqdHCK',
				'2dBwB667LHQkLhdYlwLUZK'
			]
		},
		{
			musicMood : 'Angry',
			// song IDs for Break Stuff, I Hate Everything About You, Down with the Sickness, Bodies, Prison Song
			choices   : [
				'5cZqsjVs6MevCnAkasbEOX',
				'6rUp7v3l8yC4TKxAAR5Bmx',
				'40rvBMQizxkIqnjPdEWY1v',
				'7CpbhqKUedOIrcvc94p60Y',
				'3AwLxSqo1jOOMpNsgxqRNE'
			]
		},
		{
			musicMood : 'Silly',
			// song IDs for White & Nerdy, Itsy-Bitsy Teeny-Weeny Yellow Polka Dot Bikini, F.U.N. Song, Axel F, Barbie Girl
			choices   : [
				'60R2v9lheAu3lwZwAFxMZK',
				'3B3jI9LaQyOwrtjdlnNOw0',
				'0gdLTqxAY4DDUQxXzmwj1z',
				'2Ea1iuiNtpR9BcFlQYRE5d',
				'2RSOzvKUnfDDrb2nQPfpQU'
			]
		},
		{
			musicMood : 'Festive',
			// song IDs for Grandma Got Run Over by a Reindeer, All I Want for Christmas is You, Monster Mash, Thriller, It's the Most Wonderful Time of the Year
			choices   : [
				'49iHYFjT5yO6WEw6KerX9o',
				'0bYg9bo50gSsH3LtXe2SQn',
				'0xxZY5C9xxij3D1HkzbnfC',
				'7azo4rpSUh8nXgtonC6Pkq',
				'5hslUAKq9I9CG2bAulFkHN'
			]
		}
	];
	let song = $(this).attr('data-name');
	for (let i = 0; i < songsArray.length; i++) {
		if (mood === songsArray[i].musicMood) {
			var randomNum = Math.floor(Math.random() * 5);
			song = songsArray[i].choices[randomNum];
		}
	}
	console.log(song);

	const getTracksURL = 'https://api.spotify.com/v1/tracks?ids=' + song + '&market=US';
	$.ajax({
		url     : getTracksURL,
		method  : 'GET',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			Authorization  :
				'Bearer BQAx8R-PTTrNk9s_Zf_Aw9sitCZgorZvVNdyg8_pk7oHk1gSr7M2NtPNWcolclVTfls8kINRxOaRJPMc2yD3w0k6fHXhzkC6PqAAWWtgUvmeZ8ywbGDDtkO3mFNwSs5r7mkKj2Y4TeQezaAucxZEAA'
		}
	}).then(function(response) {
		console.log(response);
		// Creating a div to hold the song
		const songDiv = $("<div class='songDiv'>");

		// Storing the title
		const title = response.tracks['0'].name;
		// Creating an element to have the title displayed
		console.log(title);
		const pOne = $('<p>').text('Title: ' + title);
		// Displaying the title
		songDiv.append(pOne);

		// Storing the artist
		const artist = response.tracks['0'].artists['0'].name;
		// Creating an element to have the artist displayed
		const pTwo = $('<p>').text('Artist: ' + artist);
		// Displaying the artist
		songDiv.append(pTwo);

		// Storing the album
		const album = response.tracks['0'].album.name;
		// Creating an element to have the album displayed
		const pThree = $('<p>').text('Album: ' + album);
		// Displaying the album
		songDiv.append(pThree);

		// Append song link
		const songURL = response.tracks['0'].external_urls.spotify;
		const link = $("<p><a title='songlink' href='" + songURL + "'>" + 'Click here to listen!' + '</a></p>');
		songDiv.append(link);

		// Retrieving the URL for the album image
		const imageURL = response.tracks['0'].album.images['0'].url;
		const albumImage = $('<img>').attr('src', imageURL).width(200).height(200);
		//Displaying the albumImage
		songDiv.append(albumImage);

		// Add each song's info to the songs-view div (and replace previous song info)
		$('#songs-view').html(songDiv);
	});
}

function displayVideo(mood) {
	const videosArray = [
		{
			videoMood : 'Happy',
			choices   : [ 
				'heavy is dead', 
				'funny cats', 
				'inspiring',]
		},
		{
			videoMood : 'Sad',
			choices   : [
				"paperman",
				"kitbull",
				'Giving',]
		},
		{
			videoMood : 'Angry',
			choices   : [
				'spooky ghost',
				'avatar trailer',
				'Kill Bill',]
		},
	];

	let video = $(this).attr('data-name');

	// if statement for each of the mood
	for (let i = 0; i < videosArray.length; i++) {
		if (mood === videosArray[i].videoMood) {
			var randomNum = Math.floor(Math.random() * 3);
			video = videosArray[i].choices[randomNum];
		}
	}
	console.log(video);

	const queryURL = 'https://www.googleapis.com/youtube/v3/search' + video + '&apikey=AIzaSyDAGGCpLGmBI-YC8qWftw53XEQ47Iv8vRc';

	// Creating an AJAX call for the specific movie button being clicked
	$.ajax({
		url    : queryURL,
		method : 'GET'
	}).then(function(response) {
		// Creating a div to hold the movie
		const videoDiv = $("<div class='video'>");

		// Storing the rating data
		const rating = response.Rated;

		// Creating an element to have the rating displayed
		const pOne = $('<p>').text('Rating: ' + rating);

		// Displaying the rating
		movieDiv.append(pOne);

		// Storing the release year
		const released = response.Released;

		// Creating an element to hold the release year
		const pTwo = $('<p>').text('Released: ' + released);

		// Displaying the release year
		movieDiv.append(pTwo);

		// Storing the plot
		const plot = response.Plot;

		// Creating an element to hold the plot
		const pThree = $('<p>').text('Plot: ' + plot);

		// Appending the plot
		movieDiv.append(pThree);

		// Retrieving the URL for the image
		const imgURL = response.Poster;

		// Creating an element to hold the image
		const image = $('<img>').attr('src', imgURL);

		// Appending the image
		movieDiv.prepend(image);

		// Putting the entire movie above the previous movies
		$('#videos-view').html(videoDiv);
	});
}