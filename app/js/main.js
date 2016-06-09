// https://openweathermap.org/api
// Weather API by zip code
// I'll need to add the zip and country: ?zip=93444,us
// http://api.openweathermap.org/data/2.5/find?q=93444&units=imperial
var url = 'http://api.openweathermap.org/data/2.5/weather'; 
var apiKey = '?APPID=8c4b46cedd6c92ead5cc73764cde0c31';
var zipCode = '&zip=93444,us';

var initialRequest = url + apiKey + zipCode;

$.get(initialRequest)
	.done(function(response) {
		console.log(response);
		
		var detail = response.weather[0].description;
		var weatherIcon = response.weather[0].icon;
		var degree = response.main.temp;
	});

function KelvinToCelsius(tempCelsius) {
	return tempCelsius - 273.15;
}

function KelvinToFahrenheit(tempKelvin) {
	return tempKelvin * 9/5 - 459.67;
}

console.log(KelvinToCelsius(293.942));