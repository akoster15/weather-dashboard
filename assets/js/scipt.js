//Variables
var searchCity = $("#search-btn");
var newCity = $("#city-button");
var cityName = document.getElementById("#city-input");
var temp = document.getElementById("#temp");
var icon = document.getElementById("weather-icon");
var humidity = document.getElementById("hum");
var uvIndex = document.getElementById("#uv");
var windSpeed = document.getElementById("#wind")

//API Variables
var apiKey = "e4113ca346b64a613160d1703c7cdbf0";
var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q";
var forecastApi = "https://api.openweathermap.org/data/2.5/forecast?q=";
var units = "units=imperial";
var iconApi = "https://openweathermap.org/img/wn/";


$(document).ready(function() {
});

if (localStorage.getItem("city") === null) {
    var cities = [];
}
else {
    var cities = JSON.parse(localStorage.getItem("city"));
    renderCityButtons();
};

$(searchCity).on("click", function(event) {
    event.preventDefault();
    forecastWeather()
});

function currentWeather() {
    let city = $("#city-input").val();
    let weatherQueryURL = weatherApi + city + units + apiKey;
}