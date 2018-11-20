//when document loads do this function
$(document).ready(function () {

    //get geo location 
    navigator.geolocation.getCurrentPosition(success, error);
    function success(pos) {
        var lat = pos.coords.latitude;
        var long = pos.coords.longitude;
        weather(lat, long);
    }
    function error() {
        console.log("error");
    }
    function weather(lat, long) {
        //changed static lat and long with var
        var url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`;

        $.getJSON(url,
            function (data) {  
                updateDOM(data);   
            }
        );
        
    }

    // update weather data pulled from weather api
    function updateDOM(data) {
        var city = data.name;
        // convert celsius to fahrenheit
        var temp = Math.round(data.main.temp * 9/5 + 32);
        var desc = data.weather[0].description;
        var icon = data.weather[0].icon;

        $("#city").html(city);
        $("#temp").html(temp);
        $("desc").html(desc);
        $("#icon").attr("src", icon);

    }
    $("#city-name").keyup(function (e) { 
        if(e.keyCode === 13){
            var cityname = $("#city-name").val();
        }
    });
});