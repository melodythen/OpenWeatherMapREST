$(document).ready(function(){
   getWeather(); 
});


function getWeather(){
    $('#getWeatherButton').click(function(event){
        loadCurrent();
        loadFiveDays();
        
        
    });
}


function loadCurrent(){
    clearCurrentTable();
    var currentRows = $('#currentTableItem');
    var currentDesc = $('#currentTableItemDesc');
    var cityName = $('#cityCondition');
    
    $.ajax({
    type: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/weather?zip=' + $('#zipcode').val() +
            '&appid=b7ee0197c4cee473050440d520c120c0' + '&units=' + $('#unitSelect').find(":selected").text().toLowerCase(),
    headers:{
        'Accept' : 'application/json'
    },
    success: function(weatherArray){
        
        $('#currentConditionInCity').show();
        var weather = weatherArray.weather[0].main;
        var imageURL = 'http://openweathermap.org/img/w/'+ weatherArray.weather[0].icon+'.png';
        var description = weatherArray.weather[0].description;
        var row = '<tr>';
            row += '<td><img src = "'+ imageURL +'"> '+ weather + ' : ' + description + '</img>' +'</td>';
            row += '</tr>';
        

        currentRows.append(row);
        cityName.append(weatherArray.name);
        var fOrC = ( $('#unitSelect').find(":selected").text() == "Imperial") ? "F": "C";
        var temp = weatherArray.main.temp +" " +fOrC;
        var humidity =weatherArray.main.humidity ;
        var windSpeedUnit = ( $('#unitSelect').find(":selected").text() == "Imperial")? "miles/hour" :"km/hour" ;
        var wind = weatherArray.wind.speed + " "+windSpeedUnit ;
       
       var rowdesc = '<tr> <td> Temperature: '+ temp +'</td> </tr>';
                rowdesc += '<tr> <td> Humidity: ' + humidity + '% </td></tr>' ;
                rowdesc += '<tr> <td> Wind: ' + wind + ' </td></tr>';
          
         currentDesc.append(rowdesc);
    
    },
      error: function(){
        $('#errorMessages')
            .append($('<li>')
            .attr({class: 'list-group-item list-group-item-danger'})
            .text('Error calling web service. Please try again later.')); 
    }
    
}) ;
        
}

function clearCurrentTable(){
    $('#cityCondition').text("Current Conditions in ");
    $('#currentTableItem').empty();
    $('#currentTableItemDesc').empty();
}


function loadFiveDays(){
    
    
}