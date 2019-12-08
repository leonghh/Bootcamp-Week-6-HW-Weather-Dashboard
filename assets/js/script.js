// Get Date
$("#todaysDate").append(moment().format("DD/MM/YY"))

// Get Weather
var cityName = "singapore"
var APIKey = "e3a1df6247837808a7b143e583dff1c3";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;


      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
  
          // Log the queryURL
          console.log(queryURL);
  
          // Log the resulting object
          console.log(response);
  
          // Transfer content to HTML

  
          // Converts the temp to Kelvin with the below formula
          var tempC = (response.main.temp - 273.15);
          console.log(tempC)
          console.log(response.wind.speed + " MPH");
          console.log(response.main.humidity + "%");

        });

// Display
