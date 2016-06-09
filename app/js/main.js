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
		city: '',
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
				APP_STATE.city = response.city;
				APP_STATE.country = response.countryCode;

				// then get weather
				getWeather();
			});
	}

	function getWeather() {
		$.get(url + '&zip=' + APP_STATE.zip + ',' + APP_STATE.country)
			.done(function(response) {
				APP_STATE.detailsOfSky = response.weather[0].description;
				APP_STATE.weatherIcon = response.weather[0].icon;
				APP_STATE.tempK = response.main.temp;

				updateUI();
			});
	}

	function updateUI() {
		var $degrees = $('#weather-degrees');
		var $unit = $('#weather-unit');
		var $details = $('#weather-details');
		
		// apply weather to view
		$degrees.attr('data-kelvin', APP_STATE.tempK);
		$degrees.html(determinUnit(APP_STATE.tempK) + '&deg;');
		$unit.text(APP_STATE.unit);

		// apply details
		$details.text(APP_STATE.detailsOfSky);
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
	var $form = $('#zip-code-entry');
	$form.submit(function(e){
		e.preventDefault();
		// Should be doing some validation ... 
		var $newZip = $('#new-zip');
		APP_STATE.zip = $newZip.val();

		getWeather();

		$newZip.val('');
	});



}(jQuery));