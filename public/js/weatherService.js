// weatherService.js

var weatherCallback = function (data) {
    var wind = data.wind;
    var main = data.main;
    $("#temperatureDiv h4").text("Weather: " + data.name);
    var text = "Wind: degree - " + wind.deg + ", speed - " + wind.speed +
        "</br> Temperature: " + main.temp + " °C" +
        "</br> Humidity percentage: " + main.humidity + "%";
    $("#temperatureDiv p").html(text);

    if (main.temp > 20 && main.temp < 25) {
        $("#temperatureDiv").append("<p><b>Recomendation: </b> Go out and don't read books.</p>");
    } else {
        $("#temperatureDiv").append("<p><b>Recomendation: </b> Stay at home and read books.</p>");
    }
};

var weatherFail = function () {
    $("#temperatureDiv h4").text("Weather: " + data.name);
    var text = "An error occurred while getting the weather.";
    $("#temperatureDiv p").html(text);
};

function getWeather() {
    var json = $.getJSON("http://api.openweathermap.org/data/2.5/weather?id=294640&units=metric&appid=fce06179b578eb590b8fbf079c974951");
    json.then(weatherCallback, weatherFail);
}