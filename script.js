$(document).ready(function() {
	//----------------------Home page formatting/responsiveness---------------------//

	$('html, body').animate(
		{
			scrollTop : '0px'
		},
		0
	);
	$('body').attr('class', 'backgroundDefault');
	let testvalue = false;
	if ($(window).width() < 1000 && testvalue === false) {
		$('body').attr('style', 'overflow: visible');
		$('#happy').addClass('happy');
		$('#sad').addClass('sad');
		$('#angry').addClass('angry');
		$('#silly').addClass('silly');
		$('#festive').addClass('festive');
		$('body').attr('class', 'backgroundDefault');
	}
	if ($(window).width() > 1000 && testvalue === false) {
		$('body').attr('style', 'overflow: hidden');
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
	}

	$(window).on('resize', function resizewindow() {
		var windoww = $(window).width();
		console.log(windoww);
		if ($(window).width() > 1000 && testvalue === false) {
			$('body').attr('style', 'overflow: hidden');
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
			$('#happy').attr('class', 'col-lg-5ths col-md-5ths col-sm-5ths col-xs-5ths moods');
			$('#sad').attr('class', 'col-lg-5ths col-md-5ths col-sm-5ths col-xs-5ths moods');
			$('#angry').attr('class', 'col-lg-5ths col-md-5ths col-sm-5ths col-xs-5ths moods');
			$('#silly').attr('class', 'col-lg-5ths col-md-5ths col-sm-5ths col-xs-5ths moods');
			$('#festive').attr('class', 'col-lg-5ths col-md-5ths col-sm-5ths col-xs-5ths moods');
		} else {
			$('html, body').animate(
				{
					scrollTop : '0px'
				},
				0
			);
			$('#happy').addClass('happy');
			$('#sad').addClass('sad');
			$('#angry').addClass('angry');
			$('#silly').addClass('silly');
			$('#festive').addClass('festive');
			$('body').attr('style', 'overflow: visible');
		}

		if (testvalue === true) {
			$('body').attr('class', 'white');
		}
		if (testvalue === true && $(window).width < 992) {
		}
	});

	$('#bth').hide();
	$('#main').show();
	$('#stuff').hide();

	//---------------------------"Back to home" button-----------------------------//

	$('#bth').on('click', function() {
		testvalue = false;
		$('html, body').animate(
			{
				scrollTop : '0px'
			},
			0
		);
		$('#main').show();
		$('#stuff').hide();
		$('body').attr('style', 'overflow: hidden');
		$('body').attr('class', 'backgroundDefault');
		$('#navbarHere').css('visibility', 'hidden');
	});

	//---------------------When any mood button is clicked------------------------//

	$('button').on('click', function(event) {
		event.preventDefault();
		testvalue = true;
		const mood = $(this).attr('data-mood');
		$('#header').text('You chose ' + mood);
		$('#main').hide();
		$('body').removeClass();
		$('#bth').show();
		$('#stuff').show();
		$('body').attr('style', 'overflow: show');
		localStorage.setItem('mood', mood);
		getGif(mood);
		displayMovieInfo(mood);
		displayMusicInfo(mood);
		getVideo(mood);
		const footer = $(
			"<footer class='footer mt-auto py-3'><div class='container-fluid'><p class='pt-3 text-center'>Copyright &copy;</p></div></footer>"
		);
		$('#footerHere').html(footer);
		const navbar = $(
			"<div class='navbar fixed-top' style='text-align:center' id='moodia'>Moodia: Media for Your Mood.</div>"
		);
		$('#navbarHere').html(navbar);
		if (mood === 'Happy') {
			$('.btns').removeClass('sadColors angryColors sillyColors festiveColors');
			$('.btns, .footer, .navbar').addClass('happyColors');
		} else if (mood === 'Sad') {
			$('.btns').removeClass('happyColors angryColors sillyColors festiveColors');
			$('.btns, .footer, .navbar').addClass('sadColors');
		} else if (mood === 'Angry') {
			$('.btns').removeClass('sadColors happyColors sillyColors festiveColors');
			$('.btns, .footer, .navbar').addClass('angryColors');
		} else if (mood === 'Silly') {
			$('.btns').removeClass('sadColors angryColors happyColors festiveColors');
			$('.btns, .footer, .navbar').addClass('sillyColors');
		} else if (mood === 'Festive') {
			$('.btns').removeClass('sadColors angryColors sillyColors happyColors');
			$('.btns, .footer, .navbar').addClass('festiveColors');
		}
		$('#navbarHere').css('visibility', 'visible');
	});

	//---------------------------Giphy-----------------------------//

	function getGif(mood) {
		// Constructing a URL to search Giphy for the mood
		const queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + mood + '&api_key=dc6zaTOxFJmzC&limit=25';

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
				for (let i = 0; i < 3; i++) {
					var randomNum = Math.floor(Math.random() * 25);
					gifrandom = results[randomNum];
					// Only taking action if the photo has an appropriate rating
					function getGifs() {
						// Creating a div for the gif
						const gifDiv = $('<div>');

						// Creating an image tag
						const moodImage = $('<img>');

						// Giving the image tag an src attribute of a property pulled off the
						// result item
						moodImage.attr('src', gifrandom.images.fixed_height.url);

						// Appending the moodImage we created to the "gifDiv" div we created
						gifDiv
							.append(moodImage)
							.attr('data-target', '#gifs-appear-here')
							.attr('data-slide-to', i.toString());

						// Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
						$('#gifs-appear-here').html(gifDiv);
					}
					getGifs();
				}
			});
	}

	//---------------------------OMDB-----------------------------//

	function displayMovieInfo(mood) {
		const moviesArray = [
			{
				movieMood : 'Happy',
				choices   : [
					'School of Rock',
					'Love Actually',
					'Forrest Gump',
					"Ferris Bueller's Day Off",
					'Sister Act',
					'The Princess Bride',
					'Girls Trip',
					'Big',
					'Grease',
					'My Big Fat Greek Wedding',
					'Mamma Mia!',
					'Pitch Perfect',
					'Mrs. Doubtfire',
					'Happy Gilmore',
					'Matilda',
					'Despicable Me',
					"It's a Wonderful Life",
					'Little Miss Sunshine',
					'Mary Poppins',
					"Breakfast at Tiffany's"
				]
			},
			{
				movieMood : 'Sad',
				choices   : [
					"My Sister's Keeper",
					"Hachi: A Dog's Tale",
					'The Green Mile',
					'The Pursuit of Happyness',
					'Good Will Hunting',
					'The Fault in Our Stars',
					'A Walk to Remember',
					'The Help',
					'World Trade Center',
					'Cinderella Man',
					'P.S. I Love You',
					'Dallas Buyers Club',
					'Marley & Me',
					'Seven Pounds',
					'The Notebook',
					'Brokeback Mountain',
					'Milk',
					'Up',
					'Philadelphia',
					'Joker'
				]
			},
			{
				movieMood : 'Angry',
				choices   : [
					'Inglourious Basterds',
					'Texas Chainsaw Massacre',
					'Kill Bill',
					'The Accountant',
					'Django Unchained',
					'Rambo',
					'Cruel Intentions',
					'8 Mile',
					'Dangerous Minds',
					'American History X',
					'Scarface',
					'Fight Club',
					'Live Free or Die Hard',
					'In Bruges',
					'The Addams Family',
					'Tucker and Dale Vs Evil',
					'The Belko Experiment',
					'Mayhem',
					'Upgrade',
					'Changing Lanes'
				]
			},
			{
				movieMood : 'Silly',
				choices   : [
					'Napoleon Dynamite',
					'Dumb and Dumber',
					'Monty Python and the Holy Grail',
					'Anchorman: The Legend of Ron Burgundy',
					'Elf',
					'The 40-Year-Old Virgin',
					'Office Space',
					'Austin Powers: International Man of Mystery',
					'The Hangover',
					'Billy Madison',
					'Borat',
					'Superbad',
					'The Mask',
					'Ace Ventura, Pet Detective',
					'Kingpin',
					"Pee-Wee's Big Adventure",
					"Wayne's World",
					'The Pink Panther',
					"National Lampoon's Animal House",
					'Zoolander'
				]
			},
			{
				movieMood : 'Festive',
				choices   : [
					// Christmas movies
					'The Holiday',
					'Bad Santa',
					'Four Christmases',
					'Die Hard',
					'How the Grinch Stole Christmas',
					'The Night Before',
					'Love Actually',
					'The Polar Express',
					'A Christmas Story',
					'The Santa Clause',

					// Halloween movies
					'Scream',
					"It's the Great Pumpkin, Charlie Brown",
					'Beetlejuice',
					'Halloween',
					'Edward Scissorhands',
					'Ghostbusters',
					'Carrie',
					'Hocus Pocus',
					'Casper',
					'Rocky Horror Picture Show'
				]
			}
		];

		// if statement for each of the moods
		for (let i = 0; i < moviesArray.length; i++) {
			if (mood === moviesArray[i].movieMood) {
				var randomNum = Math.floor(Math.random() * 20);
				movie = moviesArray[i].choices[randomNum];
			}
		}

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
			const image = $('<img>').attr('src', imgURL).width(300).height(444);

			// Appending the image
			movieDiv.prepend(image);

			// Adding title to the movie div
			movieDiv.prepend(
				"<p><img src='https://i.ya-webdesign.com/images/vector-movie-4.png' width='100' height='100'></p>"
			);

			// Putting the entire movie above the previous movies
			$('#movies-view').html(movieDiv);
		});
	}

	//---------------------------Spotify-----------------------------//
	// client ID: 9ef312560d62468a900c43c84bc1e487
	// client secret: afcbb263b8bb447aab59e6337063a256

	function displayMusicInfo(mood) {
		const songsArray = [
			{
				musicMood : 'Happy',
				// song IDs for Love Shack, Happy, Come On Eileen, Just Like Fire, Walking On Sunshine, Say Hey (I Love You), I Gotta Feeling, Don't Stop Believin', Don't Worry Be Happy, I Got You (I feel good), Somewhere Over the Rainbow, Hey Ya!, (If You’re Wondering If I Want You To) I Want You To, Just Fine, Girls Just Wanna Have Fun, Can't Stop the Feeling, All Star, Twist and Shout, Hooked on a Feeling, Celebration
				choices   : [
					'4W4wYHtsrgDiivRASVOINL',
					'60nZcImufyMA1MKQY3dcCH',
					'6tmslRyHPI7dyTe8rAHcbQ',
					'7K5dzhGda2vRTaAWYI3hrb',
					'6mht0HfWSayOESGoaXEShd',
					'1PpuABE4jUvBQaP7rGOaoi',
					'4vp2J1l5RD4gMZwGFLfRAu',
					'4bHsxqR3GMrXTxEPLuK5ue',
					'4hObp5bmIJ3PP3cKA9K9GY',
					'5haXbSJqjjM0TCJ5XkfEaC',
					'25U7raB3ZSszayTYClh4hF',
					'2PpruBYCo4H7WOBJ7Q2EwM',
					'09aDV0TC2RfWFU5IwZfIdG',
					'33vzOPcd9FRirYGlCu32x4',
					'0xs0ewnEb6c2DlY7LjOD7t',
					'1WkMMavIMc4JZ8cfMmxHkI',
					'3cfOd4CMv2snFaKAnMdnvK',
					'5ZBeML7Lf3FMEVviTyvi8l',
					'6Ac4NVYYl2U73QiTt11ZKd',
					'3K7Q9PHUWPTaknlbFPThn2'
				]
			},
			{
				musicMood : 'Sad',
				// song IDs for Say Something, Creep, Mad World, Fade Into You, Summertime Sadness, Nothing Compares 2 U, The Scientist, Breathe Me, Bruises, Can We Kiss Forever?, The Love You Left Behind, Love is a Losing Game, Will You Still Love Me Tomorrow?, I'd Rather Go Blind, Cry Baby, Kozmic Blues, Sad Forever, bury a friend, lovely, Liability
				choices   : [
					'6Vc5wAMmXdKIAM7WUoEb7N',
					'6b2oQwSGFkzsMtQruIWm2p',
					'3JOVTQ5h8HGFnDdp4VT3MP',
					'1LzNfuep1bnAUR9skqdHCK',
					'2dBwB667LHQkLhdYlwLUZK',
					'3nvuPQTw2zuFAVuLsC9IYQ',
					'75JFxkI2RXiU7L9VXzMkle',
					'2Bo0hh0yoQReC4reJav5DT',
					'4Of7rzpRpV1mWRbhp5rAqG',
					'1Av69kr9JitqPWo7WJLS5q',
					'60wa5J6SkXtBXHySQ3PoNB',
					'570ZDO2Lmh6NQChOU5xPUL',
					'0LbK1bodGLc9xmV1cS9jvL',
					'1kPBT8S2wJFNAyBMnGVZgL',
					'3L60Vu9qmY6fg2QroRIxgi',
					'1cTrWlx7OSaJf3pLpiYRRR',
					'4a5zacCsHLtMC2mcxkqWwn',
					'4SSnFejRGlZikf02HLewEF',
					'0u2P5u6lvoDfwTYjAADbn4',
					'6Kkt27YmFyIFrcX3QXFi2o'
				]
			},
			{
				musicMood : 'Angry',
				// song IDs for Break Stuff, I Hate Everything About You, Down with the Sickness, Bodies, Prison Song, Platypus (I Hate You), Party Up, Shit Luck, Don't Look Back in Anger, Angry Again, Drop the World, Worst Behavior, Murder in My Heart for the Judge, Hell No I Ain't Happy, Angry Chair, War Pigs, Cool to Hate, You Fucked Up, I've Had It, One Step Closer
				choices   : [
					'5cZqsjVs6MevCnAkasbEOX',
					'6rUp7v3l8yC4TKxAAR5Bmx',
					'40rvBMQizxkIqnjPdEWY1v',
					'7CpbhqKUedOIrcvc94p60Y',
					'3AwLxSqo1jOOMpNsgxqRNE',
					'6SFL3a2JotvZFwTiggc4cb',
					'4AIHPdr6x3qNbxTR8ngWdQ',
					'3b1UyW9VxSymsahmyL3qCD',
					'2Hvt5gu7Xavgec3vcurQtd',
					'3CI1JP2ooMBSFjIy1u6Yrc',
					'3e21cX0CVwzkQXiHz7WUQZ',
					'48RN2EOOyG2Gs5Pyla7ZJj',
					'3w4KpXGtlbJPf5gTq3GQPo',
					'2YnUO4gMwlh27KbVEj2Crn',
					'5jCp5VtcpUlHtW8Dwlx13Y',
					'2rd9ETlulTbz6BYZcdvIE1',
					'3M3gKehdtIR2krOZfkw2iK',
					'0gnvI2vSWIacE3hgLbuWtn',
					'5b0kcwMjAES1SKEHBxQHAJ',
					'3K4HG9evC7dg3N0R9cYqk4'
				]
			},
			{
				musicMood : 'Silly',
				// song IDs for White & Nerdy, Itsy-Bitsy Teeny-Weeny Yellow Polka Dot Bikini, F.U.N. Song, Axel F, Barbie Girl, Touch my Tooter, Peaches, Business Time, A Boy Named Sue, Lonely Island, WDIDLN, #deep, ART IS DEAD, Like a Boss, Low Hangin' Fruit, Kickapoo, ROBOT, Satan Gave Me a Taco, Pretty Fly (For a White Guy), Baby Got Back
				choices   : [
					'60R2v9lheAu3lwZwAFxMZK',
					'3B3jI9LaQyOwrtjdlnNOw0',
					'0gdLTqxAY4DDUQxXzmwj1z',
					'2Ea1iuiNtpR9BcFlQYRE5d',
					'2RSOzvKUnfDDrb2nQPfpQU',
					'1rQN25LEBtaokdy2jigZSZ',
					'3VEFybccRTeWSZRkJxDuNR',
					'5SyRtYGBMz7Hmq2cZaaPIf',
					'5xMNjx7uqCzMpJZSo4Wq55',
					'23tFXzIrL3esi2ECP8mprj',
					'6Miej8wT36stpnC5kU98Ws',
					'6OIq2e2RktWjiYi6xNZHqF',
					'5KqdkuWE9AkTtoAiPpdD0E',
					'23tFXzIrL3esi2ECP8mprj',
					'6sJgXQ05q4PNttoWl88sXS',
					'7lFgli7y2vo7sjgynHZzBP',
					'1Tzu1gujQfDjbZuVRLBWR3',
					'0gUPQ41YqwtO39jgcgj6VD',
					'3SFXsFpeGmBTtQvKiwYMDA',
					'1SAkL1mYNJlaqnBQxVZrRl'
				]
			},
			{
				musicMood : 'Festive',
				// song IDs (xmas) for Grandma Got Run Over by a Reindeer, All I Want for Christmas is You,  It's the Most Wonderful Time of the Year, Jingle Bell Rock, Holly Jolly Christmas, Santa Baby, Rockin' Around the Christmas Tree, You're a Mean One Mr. Grinch, Feliz Navidad, Baby It's Cold Outside
				// song IDs (halloween) for Monster Mash, Thriller, Ghostbusters, Disturbia, Superstition, This is Halloween, I'm in Love with a Monster, Freak on Me, Somebody's Watching Me, I Put a Spell on You
				choices   : [
					// Christmas songs:
					'49iHYFjT5yO6WEw6KerX9o',
					'0bYg9bo50gSsH3LtXe2SQn',
					'5hslUAKq9I9CG2bAulFkHN',
					'6xE98wKYt4vZk8j7cctjw8',
					'33BcB8XVwJU4qB7bDSkVya',
					'1vZKP9XURuqMp1SpXGnoyb',
					'28fuXrmmF9dYWx25dMW9dP',
					'6TnjaL02usP9dwCGzdk5GS',
					'0oPdaY4dXtc3ZsaG17V972',
					'4MrfQL4TYQXJBlZYpAHTuE',

					// Halloween songs:
					'0xxZY5C9xxij3D1HkzbnfC',
					'7azo4rpSUh8nXgtonC6Pkq',
					'300zfRaCgTmEm5Eqe3HqZZ',
					'2VOomzT6VavJOGBeySqaMc',
					'4dwrL3Z5U2RZ6MZiKE2PgL',
					'2R6BwqVhAZOdz0NzUQAEh5',
					'0hO71r8vbnrXSaXVrR9ptF',
					'2cLdAX3vruDbZm4kIjiXQB',
					'6A4Jc8npNo79BOgsrPptLA',
					'0sjxRg1VlYfx4YG7uxurrq'
				]
			}
		];

		for (let i = 0; i < songsArray.length; i++) {
			if (mood === songsArray[i].musicMood) {
				var randomNum = Math.floor(Math.random() * 20);
				song = songsArray[i].choices[randomNum];
			}
		}

		const getTracksURL = 'https://api.spotify.com/v1/tracks?ids=' + song + '&market=US';
		$.ajax({
			url     : getTracksURL,
			method  : 'GET',
			headers : {
				Accept         : 'application/json',
				'Content-Type' : 'application/json',
				Authorization  :
					'Bearer BQBd1JuDQ5dZnqd49ZEnHRfNO9wewfxmyuqdFyjHl0e6YSnPXRLDcogPqMj8vLJJ8FGgINtkz0m3RUONLD5fSNDYUe2BLkSLehpaDGrvuBSIw_Fz05fAAeUpobQJubYmw1XC6AN4ydYIBsvdZ6FHlg'
			}
		}).then(function(response) {
			// Creating a div to hold the song
			const songDiv = $("<div class='songDiv'>");

			// Adds title to the song div
			songDiv.prepend(
				"<p style='font-size:200%'><img src='https://cdn3.iconfinder.com/data/icons/small-black/512/music_notes_quaver_songs_sound-512.png' width='100' height='100'></p>"
			);

			// Retrieving the URL for the album image
			const imageURL = response.tracks['0'].album.images['0'].url;
			const albumImage = $('<img>').attr('src', imageURL).width(300).height(444);
			//Displaying the albumImage
			songDiv.append(albumImage);

			// Storing the title
			const title = response.tracks['0'].name;
			// Creating an element to have the title displayed
			const pOne = $('<p>').text('Song: ' + '"' + title + '"');
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
			const link = $("<p><a title='songlink' href='" + songURL + "'>" + 'Listen on Spotify!' + '</a></p>');
			songDiv.append(link);

			// Add each song's info to the songs-view div (and replace previous song info)
			$('#songs-view').html(songDiv);
		});
	}

	//---------------------------YouTube-----------------------------//

	function getVideo(mood) {
		const videosArray = [
			{
				videoMood : 'Happy',
				// Heavy is dead, Adorable pets,
				choices   : [
					'https://www.youtube.com/embed/vZE1pev2IWE',
					'https://www.youtube.com/embed/oiuyhxp4w9I',
					'https://www.youtube.com/embed/Eb0qWVmpY9U',
					'https://www.youtube.com/embed/wTblbYqQQag',
					'https://www.youtube.com/embed/mgmVOuLgFB0'
				]
			},

			{
				videoMood : 'Sad',
				choices   : [
					'https://www.youtube.com/embed/eRl2OlyNMuc',
					'https://www.youtube.com/embed/AZS5cgybKcI',
					'https://www.youtube.com/embed/WjqiU5FgsYc',
					'https://www.youtube.com/embed/kweN7VLx-JE',
					'https://www.youtube.com/embed/Cwn3Ru0o8Io'
				]
			},
			{
				videoMood : 'Angry',
				choices   : [ '', '', '', '', '' ]
			},
			{
				videoMood : 'Silly',
				choices   : [
					'https://www.youtube.com/embed/Dd7FixvoKBw',
					'https://www.youtube.com/embed/DODLEX4zzLQ',
					'https://www.youtube.com/embed/mAX9qzX_LQU',
					'https://www.youtube.com/embed/2aK8hy50fS4',
					'https://www.youtube.com/embed/P2qOZDuiYlM'
				]
			},
			{
				videoMood : 'Festive',
				choices   : [
					'https://www.youtube.com/embed/O1C9zOQpKG4',
					'https://www.youtube.com/embed/Qota928VTXw',
					'https://www.youtube.com/embed/vOGhAV-84iI',
					'https://www.youtube.com/embed/BlcYd_arZYE',
					''
				]
			}
		];
		let video = $(this).attr('data-name');
		for (let i = 0; i < videosArray.length; i++) {
			if (mood === videosArray[i].videoMood) {
				var randomNum = Math.floor(Math.random() * 5); //change to match any added videos//
				video = videosArray[i].choices[randomNum];
				$('#chewtube').attr('src', video);
			}
		}
		console.log(video);
	}

	//---------------------------'I want more' button-----------------------------//
	$('#tryagain').on('click', function(event) {
		const mood = localStorage.getItem('mood');
		event.preventDefault();
		displayMovieInfo(mood);
		displayMusicInfo(mood);
		getGif(mood);
		getVideo(mood);
	});
});
