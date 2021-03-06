//Variables
const today = moment().format("dddd, MMMM Do, YYYY"); 
const searchCity =  $("#search-btn"); 
const newCityBtn = $("#city-button");
const cityName = document.getElementById("#city-input"); 
const temperature = document.getElementById("#temp"); 
const icon = document.getElementById("weather-icon"); 
const humidity = document.getElementById("hum"); 
const windSpeed = document.getElementById("#wind"); 
const uvIndex = document.getElementById("#uv"); 
const forecastDay1 = moment().add(1,'days').format("MMM Do"); 
const forecastDay2 = moment().add(2,'days').format("MMM Do");
const forecastDay3 = moment().add(3,'days').format("MMM Do"); 
const forecastDay4 = moment().add(4,'days').format("MMM Do"); 
const forecastDay5 = moment().add(5,'days').format("MMM Do");

//API Variables
const apiKey = "&APPID=5accc33209d1c0dd9925ae90d4b60f93"; 
const weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" 
const forecastApi = "https://api.openweathermap.org/data/2.5/forecast?q=" 
const uvApi =  "https://api.openweathermap.org/data/2.5/uvi?lat="; 
const units =  "&units=imperial"; 
const iconApi = "https://openweathermap.org/img/wn/"; 

//Dates for current weather/5 day forecast
$("#currentDay").append(today)
$("#day-1").append(forecastDay1) 
$("#day-2").append(forecastDay2)
$("#day-3").append(forecastDay3) 
$("#day-4").append(forecastDay4) 
$("#day-5").append(forecastDay5)

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
        $("#temp").html(roundTemp + "?? F");
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

//5 Day Forecast Function
function forecastWeather() {
    let city = $("#city-input").val();
    let forecastQueryURL = forecastApi + city + units + apiKey;

    $.ajax({
        url: forecastQueryURL,
        method: "GET"
    }).then(function(response) {

        let roundTemp1 = Math.floor(response.list[6].main.temp);
        let roundTemp2 = Math.floor(response.list[14].main.temp);
        let roundTemp3 = Math.floor(response.list[22].main.temp);
        let roundTemp4 = Math.floor(response.list[30].main.temp);
        let roundTemp5 = Math.floor(response.list[38].main.temp);

        //Day 1
        $("#weather-icon-1").attr("src", iconApi + (response.list[6].weather[0].icon) + ".png");
        $("#temp-1").html(roundTemp1 + "?? F");
        $("#hum-1").html(response.list[6].main.humidity + " %");

        //Day 2
        $("#weather-icon-2").attr("src", iconApi + (response.list[14].weather[0].icon) + ".png");
        $("#temp-2").html(roundTemp2 + "?? F");
        $("#hum-2").html(response.list[14].main.humidity + " %");

        //Day 3
        $("#weather-icon-3").attr("src", iconApi + (response.list[22].weather[0].icon) + ".png");
        $("#temp-3").html(roundTemp3 + "?? F");
        $("#hum-3").html(response.list[22].main.humidity + " %");

        //Day 4
        $("#weather-icon-4").attr("src", iconApi + (response.list[30].weather[0].icon) + ".png");
        $("#temp-4").html(roundTemp4 + "?? F");
        $("#hum-4").html(response.list[30].main.humidity + " %");

        //Day 5
        $("#weather-icon-5").attr("src", iconApi + (response.list[38].weather[0].icon) + ".png");
        $("#temp-5").html(roundTemp5 + "?? F");
        $("#hum-5").html(response.list[38].main.humidity + " %");

        currentWeather()
    });
}

//List of button from searched cities 
function renderCityButtons() {
    $("#city-button").empty();

    //Loop for going through array of cities
    for (var i = 0; i < cities.length; i++) {
        var newCity = $("<li>");
        newCity.addClass("list-group-item");
        newCity.attr("data-name", cities[i]);
        newCity.text(cities[i]);
        newCity.val("search-history");
        $("#city-button").prepend(newCity);
    }
}

let city =[""]

//Search button for new city search
$("#search-btn").on("click", function(event) {
    event.preventDefault();

    var city = $("#city-input").val().trim();
    cities.push(city);
   
    renderCityButtons();
    localStorage.setItem("city", JSON.stringify(cities));
});

//Return results for previously search cities
$(document).on("click", "li", function () {

    var chosenCity = $(this).attr("data-name")
     
    $("#city-input").val(chosenCity);
  
    forecastWeather()
  
});