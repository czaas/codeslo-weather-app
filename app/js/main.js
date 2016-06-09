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
			getWeather(APP_STATE);
		});
}

function getWeather(state) {
	$.get(url + '&zip=' + state.zip + ',' + state.country)
		.done(function(response) {

			APP_STATE.detailsOfSky = response.weather[0].description;
			APP_STATE.weatherIcon = response.weather[0].icon;
			APP_STATE.tempK = response.main.temp;

			updateUI(APP_STATE);
		});
}

function updateUI(state) {
	console.log(state);
	var $weather = $('#weather-degrees');
	var $details = $('#weather-details');
	
	// apply weather to view
	$weather.attr('data-kelvin', state.tempK);
	$weather.html(determinUnit(state.tempK) + '&deg;' + state.unit);

	// apply details
	$details.text(state.detailsOfSky);
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