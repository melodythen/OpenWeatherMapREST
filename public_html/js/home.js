$(document).ready(function () {
  getWeather();
});

function getWeather() {
  $("#getWeatherButton").click(function (event) {
    loadCurrent();
    loadFiveDays();
  });
}

function loadCurrent() {
  $.ajax({
    type: "GET",
    url:
      "http://api.openweathermap.org/data/2.5/weather?zip=" +
      $("#zipcode").val() +
      "&appid=###",
    headers: {
      Accept: "application/json",
    },
    success: function () {},
    error: function () {},
  });
}

function loadFiveDays() {
  $.ajax({
    type: "GET",
    url:
      "http://api.openweathermap.org/data/2.5/forecast?zip=" +
      $("#zipcode").val() + 'units=' + $().val() +  
      "&appid=####",

    headers: {
      Accept: "application/json",
    },
    success: function (fiveDayForecast) {
      $.each(fiveDayForecast, function (index, forecast) {
        var weatherDate = new Date(forecast.list.dt);
        var imgUrl =
          "http://openweathermap.org/img/w/" +
          forecast.list.weather.icon +
          ".png";
        var mainCondition = forecast.list.weather.main;
        var highTemp = ;
        var lowTemp = ;
      });
    },
    error: function () {},
  });
}
