var userCityName = $("#cityNameInput").val();
var cityName = userCityName.charAt(0).toUpperCase() + userCityName.substring(1);
var todaysDate = moment().format("DD/MM/YY")


function getWeatherForecast(cityName) {
  var APIKey = "e3a1df6247837808a7b143e583dff1c3";
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&appid=" + APIKey;
  
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            // getting weather for current day
            console.log(response);
            // Current Day Temp
            var tempC = Math.round((response.list[0].main.temp) * 10) / 10;
            $("#cityTemp").text("Temperature: " + tempC + "°C");
            // Current Day Weather Icon
            weatherIcon = response.list[0].weather[0].icon
            var weatherConditions = "http://openweathermap.org/img/wn/" + weatherIcon +"@2x.png"
            console.log(weatherConditions)
            $("#cityWeatherIcon").attr("src", weatherConditions);
            console.log(response.list[0].weather[0].description);
            // Current Day Wind Speed
            var cityWindSpeed = response.list[0].wind.speed;
            $("#cityWindSpeed").text("Wind Speed: " + cityWindSpeed +" MPH");
            // Current Day Humidity
            var cityHumidity = response.list[0].main.humidity;
            $("#cityHumidity").text("Humidity: " + cityHumidity + "%");
            var cityLatitude = response.city.coord.lat;
            var cityLongitudes = response.city.coord.lon;
            // Getting UV Index for current day
            var queryUVIURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + cityLatitude + "&lon=" + cityLongitudes
              $.ajax({
                url: queryUVIURL,
                method: "GET"
              })
                .then(function(response) {
                  var cityUVI = response.value;
                  $("#cityUVI").text("UV Index: " + cityUVI)

                });
            // Geeting weather forecast for next 5 days
            
            for (var i = 1; i < 6; i++) {
              var fiveDayForecast = $("<div>");
              fiveDayForecast.addClass("forecastBox d-inline-block");
              // 5 Day Date
              var fiveDayDate = $("<h4>");
              fiveDayDate.text(moment().add(i, 'days').format("DD/MM/YY"));
              // 5 Day Weather Icon
              var fiveDayWeatherIcon = $("<img>").height(40)
              var fiveDayweatherIconCode = response.list[i].weather[0].icon
              console.log(fiveDayweatherIconCode)
              var fiveDayweatherConditions = "http://openweathermap.org/img/wn/" + fiveDayweatherIconCode +"@2x.png"
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
  $("#cityNameInput").val("");
  hideWelcomePage();
  displayCityForecast();
});

// Capitialise each word
function capital_letter(str) 
{
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}

function hideWelcomePage() {
  $(".welcomePage").hide()
  $(".forecastPage").show()
}

function displayCityForecast() {
  $('#forecastContainer').empty();
  var userCityName = $("#cityNameInput").val();
  var cityName = capital_letter(userCityName)
  $(".cityNameDisplay").text(cityName);
  $(".cityDateDisplay").text(todaysDate);
  $("#forecastHeader").text("5 Day Forecast");
  getWeatherForecast(cityName);
}

