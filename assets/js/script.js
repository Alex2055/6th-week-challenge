// show my City weather to fill the page on load
window.addEventListener('DOMContentLoaded', myFunction);
var myCity = "Nashville";

function myFunction() {
  var dateformat = moment().format('l');


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

      var todaysdate = document.getElementById("topDate");
      todaysdate.innerHTML = "(" + dateformat + ")";

      var skyCondition = document.getElementById("skyCond");
      skyCondition.setAttribute('src', 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png')

      var currentTemp = document.getElementById("Temp");
      var tempInt = Math.round(response.main.temp);
      currentTemp.innerHTML = "Temperature: " + tempInt + "F";


      var humiditi = document.getElementById("Humid");
      var humidString = response.main.humidity.toString();
      humiditi.innerHTML = "Humidity: " + humidString + "%";

      var windspeed = document.getElementById("windSpeed");
      var windFixed = response.wind.speed.toFixed(1);
      windspeed.innerHTML = "Wind Speed: " + windFixed + "MPH";

    })

  fetch(
    'https://api.openweathermap.org/data/2.5/forecast?q=' + myCity + '&appid=8eda773abbe6b913d62bbf5d3cc23857&units=imperial'
  )

    .then(function (response) {
      return response.json();
    })

    .then(function (response) {
      console.log(response);


      //fill first day

      var todaysdate = document.getElementById("fiDate");
      todaysdate.innerHTML = response.list[0].dt_txt.slice(5, 7) + "/" + response.list[0].dt_txt.slice(8, 10) + "/" + response.list[0].dt_txt.slice(0, 4);

      var skyConditioncol = document.getElementById("fiSky");
      skyConditioncol.setAttribute('src', 'http://openweathermap.org/img/wn/' + response.list[0].weather[0].icon + '@2x.png')

      var todaystemp = document.getElementById("fiTemp");
      todaystemp.innerHTML = "Temp: " + Math.round(response.list[0].main.temp) + "F";

      var todayshumid = document.getElementById("fiHumid");
      todayshumid.innerHTML = "Humidity: " + response.list[0].main.humidity + "%";



      function fillDays() {
        var arreyindex = 0;
        var currentDateNum = Number(dateformat.slice(2, 4));


        //fill second day
        while (currentDateNum + 1 > Number(response.list[arreyindex].dt_txt.slice(8, 10))) {

          arreyindex++;
        }


        var todaysdate = document.getElementById("sDate");
        todaysdate.innerHTML = response.list[arreyindex].dt_txt.slice(5, 7) + "/" + response.list[arreyindex].dt_txt.slice(8, 10) + "/" + response.list[arreyindex].dt_txt.slice(0, 4);

        var skyConditioncol = document.getElementById("sSky");
        skyConditioncol.setAttribute('src', 'http://openweathermap.org/img/wn/' + response.list[arreyindex].weather[0].icon + '@2x.png')

        var todaystemp = document.getElementById("sTemp");
        todaystemp.innerHTML = "Temp: " + Math.round(response.list[arreyindex].main.temp) + "F";

        var todayshumid = document.getElementById("sHumid");
        todayshumid.innerHTML = "Humidity: " + response.list[arreyindex].main.humidity + "%";




        //fill third day

        while (currentDateNum + 2 > Number(response.list[arreyindex].dt_txt.slice(8, 10))) {

          arreyindex++;
        }
        var todaysdate = document.getElementById("tDate");
        todaysdate.innerHTML = response.list[arreyindex].dt_txt.slice(5, 7) + "/" + response.list[arreyindex].dt_txt.slice(8, 10) + "/" + response.list[arreyindex].dt_txt.slice(0, 4);;

        var skyConditioncol = document.getElementById("tSky");
        skyConditioncol.setAttribute('src', 'http://openweathermap.org/img/wn/' + response.list[arreyindex].weather[0].icon + '@2x.png')

        var todaystemp = document.getElementById("tTemp");
        todaystemp.innerHTML = "Temp: " + Math.round(response.list[arreyindex].main.temp) + "F";

        var todayshumid = document.getElementById("tHumid");
        todayshumid.innerHTML = "Humidity: " + response.list[arreyindex].main.humidity + "%";


        // fill fourth day

        while (currentDateNum + 3 > Number(response.list[arreyindex].dt_txt.slice(8, 10))) {

          arreyindex++;
        }
        var todaysdate = document.getElementById("foDate");
        todaysdate.innerHTML = response.list[arreyindex].dt_txt.slice(5, 7) + "/" + response.list[arreyindex].dt_txt.slice(8, 10) + "/" + response.list[arreyindex].dt_txt.slice(0, 4);;

        var skyConditioncol = document.getElementById("foSky");
        skyConditioncol.setAttribute('src', 'http://openweathermap.org/img/wn/' + response.list[arreyindex].weather[0].icon + '@2x.png')

        var todaystemp = document.getElementById("foTemp");
        todaystemp.innerHTML = "Temp: " + Math.round(response.list[arreyindex].main.temp) + "F";

        var todayshumid = document.getElementById("foHumid");
        todayshumid.innerHTML = "Humidity: " + response.list[arreyindex].main.humidity + "%";



        //fill fifth day

        while (currentDateNum + 4 > Number(response.list[arreyindex].dt_txt.slice(8, 10))) {

          arreyindex++;
        }
        var todaysdate = document.getElementById("fifDate");
        todaysdate.innerHTML = response.list[arreyindex].dt_txt.slice(5, 7) + "/" + response.list[arreyindex].dt_txt.slice(8, 10) + "/" + response.list[arreyindex].dt_txt.slice(0, 4);;

        var skyConditioncol = document.getElementById("fifSky");
        skyConditioncol.setAttribute('src', 'http://openweathermap.org/img/wn/' + response.list[arreyindex].weather[0].icon + '@2x.png')

        var todaystemp = document.getElementById("fifTemp");
        todaystemp.innerHTML = "Temp: " + Math.round(response.list[arreyindex].main.temp) + "F";

        var todayshumid = document.getElementById("fifHumid");
        todayshumid.innerHTML = "Humidity: " + response.list[arreyindex].main.humidity + "%";



      }
      fillDays();


    })

}


function addnewCity() {
  var newCity = document.getElementById("locationinput").value;

  myCity = newCity;

  myFunction();
}
