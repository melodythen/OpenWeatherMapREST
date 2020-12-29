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
    var currentRows = $('#currentTableItem');
    var currentDesc = $('#currentTableItemDesc');
    var cityName = $('#cityCondition');
    $.ajax({
    type: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/weather?zip=' + $('#zipcode').val() +
            '&appid=b7ee0197c4cee473050440d520c120c0' + '&units=' + $('#units').find(":selected").text().toLowerCase(),
    headers:{
        'Accept' : 'application/json'
    },
    success: function(weatherArray){
        $('#currentConditionInCity').show();
        var weather = weatherArray.weather[0].main;
        var imageURL = 'http://openweathermap.org/img/w/'+ weatherArray.weather[0].icon+'.png';
        var description = weatherArray.weather[0].description;
        var row = '<tr>';
            row += '<td><img src = "'+ imageURL +'"></img>' +'</td>';
            row += '</tr>';
            row += '<tr> <td>' + weather + ' : ' + description +'</td>';
            row += '</tr>';

        currentRows.append(row);
        cityName.append(weatherArray.name);
        var fOrC = ( $('#units').find(":selected").text().toLowerCase() == "imperial") ? "F": "C";
        var temp = weatherArray.main.temp +" " +fOrC;
        var humidity =weatherArray.main.humidity ;
        var wind = weatherArray ;
        currentDesc.append(desc);
    },
    error: function(){
        
    }
    
}) ;
        
}

function loadFiveDays(){
    
    
}