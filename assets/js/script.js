var todaysDate = moment().format("DD/MM/YY")

var cities = [];

init();
loadLastCity();

function getWeatherForecast(cityName) {
  $(".cityDateDisplay").text(todaysDate);
  $("#forecastHeader").text("5 Day Forecast");
  var APIKey = "e3a1df6247837808a7b143e583dff1c3";
  if (location.protocol === 'http:') {
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&appid=" + APIKey;
  }
  else {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&appid=" + APIKey;
  }

        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            // getting weather for current day
            
            // Current Day Temp
            var tempC = Math.round((response.list[0].main.temp) * 10) / 10;
            $("#cityTemp").text("Temperature: " + tempC + "°C");
            
            // Current Day Weather Icon
            weatherIcon = response.list[0].weather[0].icon;
            var weatherConditions = "http://openweathermap.org/img/wn/" + weatherIcon +"@2x.png";
            $("#cityWeatherIcon").attr("src", weatherConditions);
            
            // Current Day Wind Speed
            var cityWindSpeed = response.list[0].wind.speed;
            $("#cityWindSpeed").text("Wind Speed: " + cityWindSpeed +" MPH");
            
            // Current Day Humidity
            var cityHumidity = response.list[0].main.humidity;
            $("#cityHumidity").text("Humidity: " + cityHumidity + "%");
            var cityLatitude = response.city.coord.lat;
            var cityLongitudes = response.city.coord.lon;
            
            // Getting UV Index for current day
            if (location.protocol === 'http:') {
              var queryUVIURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + cityLatitude + "&lon=" + cityLongitudes;
            }
            else {
              var queryUVIURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + cityLatitude + "&lon=" + cityLongitudes;
            }

              $.ajax({
                url: queryUVIURL,
                method: "GET"
              })
                .then(function(response) {
                  var cityUVI = response.value;
                  $("#cityUVI").text("UV Index: " + cityUVI);
                });
            
                // Geeting weather forecast for next 5 days
            
            for (var i = 1; i < 6; i++) {
              var fiveDayForecast = $("<div>");
              fiveDayForecast.addClass("forecastBox d-inline-block");
              // 5 Day Date
              var fiveDayDate = $("<h4>");
              fiveDayDate.text(moment().add(i, 'days').format("DD/MM/YY"));
              // 5 Day Weather Icon
              var fiveDayWeatherIcon = $("<img>").height(40);
              var fiveDayweatherIconCode = response.list[i].weather[0].icon;
              var fiveDayweatherConditions = "http://openweathermap.org/img/wn/" + fiveDayweatherIconCode +"@2x.png";
              fiveDayWeatherIcon.attr("src", fiveDayweatherConditions);
              // 5 Day Temp
              var fiveDayTempC = Math.round((response.list[i].main.temp) * 10) / 10;
              var fiveDayTemp = $("<div>");
              fiveDayTemp.text("Temperature: " + fiveDayTempC + "°C");
              // 5 Day Humidity
              var fiveDayHumidity = $("<div>");
              var fiveDayHumidityPercent = response.list[i].main.humidity;
              fiveDayHumidity.text("Humidity: " + fiveDayHumidityPercent + "%");
              // Append
              $("#forecastContainer").append(fiveDayForecast);
              fiveDayForecast.append(fiveDayDate);
              fiveDayForecast.append(fiveDayWeatherIcon);
              fiveDayForecast.append(fiveDayTemp);
              fiveDayForecast.append(fiveDayHumidity);
            }
          });
}  

// On Click
$("#searchBtn").on("click", function() {
  event.preventDefault();
  // hideWelcomePage();
  displayCityForecast();

  var cityText = $("#cityNameInput").val().trim();

  if (cityText === "") {
    return;
  }

  cities.push(cityText);
  $("#cityNameInput").val("");

  storeCities();
  renderCityBtn();
});

// function hideWelcomePage() {
//   $(".welcomePage").hide();
//   $(".forecastPage").show();
// }

function displayCityForecast() {
  $('#forecastContainer').empty();
  var cityName = $("#cityNameInput").val();
  $(".cityNameDisplay").text(cityName);
  // $(".cityDateDisplay").text(todaysDate);
  // $("#forecastHeader").text("5 Day Forecast");
  getWeatherForecast(cityName);
}

function renderCityBtn() {
  $(".cityList").empty();

  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];

    var cityList = $("<li>");
    cityList.addClass("list-group-item");
    var cityListBtn = $("<a>");
    cityListBtn.addClass("nav-link");
    cityListBtn.attr("href", "#");
    cityListBtn.css("text-transform", "capitalize");
    cityListBtn.text(city);
    cityList.append(cityListBtn);
    $(".cityList").append(cityList);
  }
}

function init() {
  var storedCities = JSON.parse(localStorage.getItem("citiesSaved"));

  if (storedCities !== null) {
    cities = storedCities;
  }

  renderCityBtn();
}

function loadLastCity() {
  var cityName = cities[cities.length - 1]
  $('#forecastContainer').empty();
  $(".cityNameDisplay").text(cityName);
  getWeatherForecast(cityName);

}

function storeCities() {
  localStorage.setItem("citiesSaved", JSON.stringify(cities));
}

$(".cityList").on("click", function() {
  event.preventDefault();
  var cityName = event.target.innerHTML
  $('#forecastContainer').empty();
  $(".cityNameDisplay").text(cityName);
  // $(".cityDateDisplay").text(todaysDate);
  // $("#forecastHeader").text("5 Day Forecast");
  getWeatherForecast(cityName);
});




