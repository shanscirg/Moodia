$(document).ready(function() {
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
});

//SPOTIFY
// const request = require("request");
// const user_id = "shannon";
// const token = "Bearer "
// const playlists_url = "https://api.spotify.com/v1/users/" + user_id + "/playlists"

// request({ url: playlists_url, headers: { "Authorization": token } }, function (err, res) {
//
$(document).ready(function() {
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
});

function displayMovieInfo(mood) {
	const moviesArray = [
		{
			movieMood : 'Happy',
			choices   : [ 'School of Rock', 'Love Actually', 'Forrest Gump', "Ferris Bueller's Day Off", 'Sister Act' ]
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

	const queryURL = 'https://www.omdbapi.com/?t=' + movie + '&apikey=trilogy';

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
