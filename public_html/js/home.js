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
    $.ajax({
    type: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/weather?zip=' + $('#zipcode').val() +
            '&appid=###',
    headers:{
        'Accept' : 'application/json'
    },
    success: function(){

        
    },
    error: function(){
        
    }
    
}) ;
        
}

function loadFiveDays(){
    
    
}