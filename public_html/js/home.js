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
  var fiveDayRows = $("#currentTableItem");
  $.ajax({
    type: "GET",
    url:
      "http://api.openweathermap.org/data/2.5/forecast?zip=" +
      $("#zipcode").val() +
      "units=" +
      $("#unitSelect").val() +
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
        var highTemp = forecast.list.temp_max;
        var lowTemp = forecast.list.temp_min;

        var dateRow = "<tr> <td>" + weatherDate + "</tr>";
        var conditionsRow =
          "<tr><td><img src=" +
          imgUrl +
          'alt="weather image">' +
          mainCondition +
          "</td></tr>";
        var tempsRow =
          "<tr><td>H " + highTemp + " C L" + lowTemp + " C</td></tr>";

        fiveDayRows.append(dateRow);
        fiveDayRows.append(conditionsRow);
        fiveDayRows.append(tempsRow);
      });
    },
    error: function () {},
  });
}
