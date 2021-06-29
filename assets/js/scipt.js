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

//Request for current weather
function currentWeather() {
    let city = $("#city-input").val();
    let weatherQueryURL = weatherApi + city + units + apiKey;

    $.ajax({
        url: weatherQueryURL,
        method: "GET"
    }).then(function(response) {
        let roundTemp = Math.floor(response.main.temp);

        $("#city").html(response.name);
        $("#weather-icon").attr("src", iconApi + (response.weather[0].icon) + ".png");
        $("#temp").html(roundTemp + "º F");
        $("#hum").html(response.main.humidity + " %");
        $("#wind").html(response.wind.speed + " MPH");

        //Current UV Index

        let lat = response.lat;
        let lon = response.coord.long;
        let uvQueryURL = uvApi + lat + "&lon=" + lon + apiKey;

        $.ajax({
            url: uvQueryURL,
            method: "GET"
        }).then(function(response) {
            $("#uv").html(response.value);

            let uvIndex = (response.value);

            if (uvIndex < 3) {
                $(".uv").addClass("uv-low");
                $(".uv").removeClass("uv-moderate");
                $(".uv").removeClass("uv-high");
                $(".uv").removeClass("uv-veryHigh");
                $(".uv").removeClass("uv-extreme");
              }
              else if (uvIndex < 6) {
                $(".uv").removeClass("uv-low");
                $(".uv").addClass("uv-moderate");
                $(".uv").removeClass("uv-high");
                $(".uv").removeClass("uv-veryHigh");
                $(".uv").removeClass("uv-extreme");
          
              } else if (uvIndex < 8) {
                $(".uv").removeClass("uv-low");
                $(".uv").removeClass("uv-moderate");
                $(".uv").addClass("uv-high");
                $(".uv").removeClass("uv-veryHigh");
                $(".uv").removeClass("uv-extreme");
          
              } else if (uvIndex < 11) {
                $(".uv").removeClass("uv-low");
                $(".uv").removeClass("uv-moderate");
                $(".uv").removeClass("uv-high");
                $(".uv").addClass("uv-veryHigh");
                $(".uv").removeClass("uv-extreme");
          
              } else {
                $(".uv").removeClass("uv-low");
                $(".uv").removeClass("uv-moderate");
                $(".uv").removeClass("uv-high");
                $(".uv").removeClass("uv-veryHigh");
                $(".uv").addClass("uv-extreme");
            
              };
        });           
    });
}

