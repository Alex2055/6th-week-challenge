// show my City weather to fill the page on load
window.addEventListener('DOMContentLoaded', myFunction);
var myCity = "Nashville"

function myFunction() {


  fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=' + myCity + '&appid=8eda773abbe6b913d62bbf5d3cc23857&units=imperial'
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      var showCity = document.getElementById("cityName");
      showCity.innerHTML = response.name;

      var skyCondition = document.getElementById("skyCond");
      skyCondition.setAttribute('src', 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png')

      var currentTemp = document.getElementById("Temp");
      var tempInt = Math.round(response.main.temp);
      currentTemp.innerHTML = "Temperature: " + tempInt;


      var humiditi = document.getElementById("Humid");
      var humidString = response.main.humidity.toString();
      humiditi.innerHTML = "Humiditi: " + humidString;

      var windspeed = document.getElementById("windSpeed");
      var windFixed = response.wind.speed.toFixed(1);
      windspeed.innerHTML = "Wind Speed: " + windFixed;

      






    })
}


function addnewCity() {
  var newCity = document.getElementById("locationinput").value;

  myCity = newCity;

  myFunction();
}
