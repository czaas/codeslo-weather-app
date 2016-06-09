(function($){
	// https://openweathermap.org/api
	// Weather API by zip code
	// I'll need to add the zip and country: ?zip=93444,us
	// http://api.openweathermap.org/data/2.5/find?q=93444&units=imperial
	var rootUrl = 'http://api.openweathermap.org/data/2.5/weather'; 
	var apiKey = '?APPID=8c4b46cedd6c92ead5cc73764cde0c31';
	var url = rootUrl + apiKey;

	var APP_STATE = {
		zip: '',
		country: '',
		location: '',
		tempK: 0,
		detailsOfSky: '',
		weatherIcon: '',
		unit: 'F'
	};

	init();

	function init() {
		// gets initial zip code and updates app state and UI
		$.get('http://ip-api.com/json')
			.done(function(response) {
				APP_STATE.zip = response.zip;
				APP_STATE.location = response.location;
				APP_STATE.country = response.countryCode;

				// then get weather
				getWeather();
			});
	}

	function getWeather() {
		$.get(url + '&zip=' + APP_STATE.zip + ',' + APP_STATE.country)
			.done(function(response) {
				APP_STATE.detailsOfSky = response.weather[0].description;
				APP_STATE.weatherIcon = 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png';
				APP_STATE.tempK = response.main.temp;
				APP_STATE.location = response.name;

				updateUI();
			});
	}

	function updateUI() {
		
		$('#weather-degrees').html(determinUnit(APP_STATE.tempK) + '&deg;');
		$('#weather-unit').text(APP_STATE.unit);
		$('#location').text(APP_STATE.location + ',');
		$('#weather-details').text(APP_STATE.detailsOfSky);
		$('#weather-icon').html('<img src=' + APP_STATE.weatherIcon + ' />' );
	}

	function determinUnit(temp) {
		
		switch(APP_STATE.unit) {
			case 'F':
				return KelvinToFahrenheit(temp);
				break;
			case 'C':
				return KelvinToCelsius(temp);
				break;
			default:
				return KelvinToFahrenheit(temp);
		}
	}

	// Conversions
	function KelvinToCelsius(tempCelsius) {
		return Math.round(tempCelsius - 273.15);
	}

	function KelvinToFahrenheit(tempKelvin) {
		return Math.round(tempKelvin * 9/5 - 459.67);
	}


	// listeners
	$('#zip-code-entry').submit(function(e){
		e.preventDefault();
		// Should be doing some validation ... 
		var $newZip = $('#new-zip');
		APP_STATE.zip = $newZip.val();

		getWeather();

		$newZip.val('');
	});

	$('#weather-unit').on('click', function(e){
		e.preventDefault();

		if ($(this).text() === 'F'){
			APP_STATE.unit = 'C';
		} else {
			APP_STATE.unit = 'F';
		}

		updateUI();
	});




}(jQuery));