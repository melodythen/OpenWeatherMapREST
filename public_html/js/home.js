$(document).ready(function () {
  getWeather();
});

function getWeather() {
  $("#getWeatherButton").click(function (event) {
    loadCurrent();
    loadFiveDays();
  });
}

function loadFiveDays() {
  var fiveDayRows = $("#fiveDayItem");
  $.ajax({
    type: "GET",
    url:
      "http://api.openweathermap.org/data/2.5/forecast?zip=" +
      $("#zipcode").val() +
      "&units=" +
      $("#unitSelect").find(":selected").text().toLowerCase() +
      "&appid=4868dfff7b4fc320326ab9b41baec745",

    headers: {
      Accept: "application/json",
    },
    success: function (forecastArray) {
      const fiveDayArray = [];

      forecastArray.list.forEach(function (item) {
        var sec = item.dt;
        var dummyTime = new Date(sec * 1000);
        var hour = dummyTime.getHours();
        var minutes = dummyTime.getMinutes();

        if (hour == 13 && minutes == 0) {
          fiveDayArray.push(item);
        }
      });

      console.log(fiveDayArray);

      var month = new Array();
      month[0] = "Jan";
      month[1] = "Feb";
      month[2] = "Mar";
      month[3] = "Apr";
      month[4] = "May";
      month[5] = "Jun";
      month[6] = "Jul";
      month[7] = "Aug";
      month[8] = "Sep";
      month[9] = "Oct";
      month[10] = "Nov";
      month[11] = "Dec";
      $.each(fiveDayArray, function (index, forecast) {
        var weatherDate = new Date(forecast.dt * 1000);
        var imgUrl =
          "http://openweathermap.org/img/w/" +
          forecast.weather[0].icon +
          ".png";
        console.log(imgUrl);
        var mainCondition = forecast.weather[0].main;
        var highTemp = forecast.main.temp_max;
        var lowTemp = forecast.main.temp_min;
        var fOrC =
          $("#unitSelect").find(":selected").text() == "Imperial" ? "F" : "C";

        var dateRow =
          "<tr> <td>" +
          weatherDate.getDate() +
          " " +
          month[weatherDate.getMonth()] +
          "</tr>";
        var conditionsRow =
          "<tr><td><img src=" + imgUrl + ">" + mainCondition + "</td></tr>";
        var tempsRow =
          "<tr><td>H " +
          highTemp +
          " " +
          fOrC +
          " L" +
          lowTemp +
          " " +
          fOrC +
          "</td></tr>";

        fiveDayRows.append(dateRow);
        fiveDayRows.append(conditionsRow);
        fiveDayRows.append(tempsRow);
      });
    },
    error: function () {
      $("#errorMessages").append(
        $("<li>")
          .attr({ class: "list-group-item list-group-item-danger" })
          .text("Error calling web service. Please try again later.")
      );
    },
  });
}
function loadCurrent() {
  clearCurrentTable();
  var currentRows = $("#currentTableItem");
  var currentDesc = $("#currentTableItemDesc");
  var cityName = $("#cityCondition");

  $.ajax({
    type: "GET",
    url:
      "http://api.openweathermap.org/data/2.5/weather?zip=" +
      $("#zipcode").val() +
      "&appid=4868dfff7b4fc320326ab9b41baec745" +
      "&units=" +
      $("#unitSelect").find(":selected").text().toLowerCase(),
    headers: {
      Accept: "application/json",
    },
    success: function (weatherArray) {
      $("#currentConditionInCity").show();
      var weather = weatherArray.weather[0].main;
      var imageURL =
        "http://openweathermap.org/img/w/" +
        weatherArray.weather[0].icon +
        ".png";
      var description = weatherArray.weather[0].description;
      var row = "<tr>";
      row +=
        '<td><img src = "' +
        imageURL +
        '"> ' +
        weather +
        " : " +
        description +
        "</img>" +
        "</td>";
      row += "</tr>";

      currentRows.append(row);
      cityName.append(weatherArray.name);
      var fOrC =
        $("#unitSelect").find(":selected").text() == "Imperial" ? "F" : "C";
      var temp = weatherArray.main.temp + " " + fOrC;
      var humidity = weatherArray.main.humidity;
      var windSpeedUnit =
        $("#unitSelect").find(":selected").text() == "Imperial"
          ? "miles/hour"
          : "km/hour";
      var wind = weatherArray.wind.speed + " " + windSpeedUnit;

      var rowdesc = "<tr> <td> Temperature: " + temp + "</td> </tr>";
      rowdesc += "<tr> <td> Humidity: " + humidity + "% </td></tr>";
      rowdesc += "<tr> <td> Wind: " + wind + " </td></tr>";

      currentDesc.append(rowdesc);
    },
    error: function () {
      $("#errorMessages").append(
        $("<li>")
          .attr({ class: "list-group-item list-group-item-danger" })
          .text("Error calling web service. Please try again later.")
      );
    },
  });
}

function clearCurrentTable() {
  $("#cityCondition").text("Current Conditions in ");
  $("#currentTableItem").empty();
  $("#currentTableItemDesc").empty();
}
