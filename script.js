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
		$('#carousel').hide();
		// In this case, the "this" keyword refers to the button that was clicked
		const mood = $(this).attr('data-mood');

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
						gifDiv.append(moodImage);

						// Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
						$('#gifs-appear-here').prepend(gifDiv);
					}
					getGif();
				}
			});
	});
});
