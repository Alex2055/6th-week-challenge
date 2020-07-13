// show my City weather and search History to fill the page on load
window.addEventListener('DOMContentLoaded', function () {
  myFunction();
  searchHistory();
});

var myCity = "Nashville";

// main function loads all content on the page besides search history
// I was going to divide to few smaller functions. 
// This code is hard to reed. Sorry, I am running late

function myFunction() {
  //todays date
  var dateformat = moment().format('l');

  // check if anything in local storage on load, if not, set new local storage arrey
  var checklocal = JSON.parse(localStorage.getItem("localstoreCity"));

  if (!checklocal) {
    var storeCity = [];
    localStorage.setItem("localstoreCity", JSON.stringify(storeCity));
  }

  // error massage  
  function showError() {
    window.alert("no results! please check spelling")
  }

  //first request to get the forecast for  today
  fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=' + (newCity || myCity) + '&appid=8eda773abbe6b913d62bbf5d3cc23857&units=imperial'
  )
    .then(function (response) {

      // check if the city name from input can be found on the server
      if (response.status !== 200) {
        showError();
        return {};
      }

      // add new city input to arrey
      if (newCity) {
        myCity = newCity;
        var localarrey = JSON.parse(localStorage.getItem("localstoreCity"));
        localarrey.unshift(myCity);

        //keep serch history no more then 8
        if (localarrey.length > 8) {
          localarrey.pop();
        }

        // save arrey in local storage and clear input text
        localStorage.setItem("localstoreCity", JSON.stringify(localarrey));
        document.getElementById("locationinput").value = "";
        searchHistory();
      }
      return response.json();
    })

    // fill todays weather block
    .then(function (response) {
      console.log(response);

      //quit if wrong input
      if (!response.weather) {
        return;
      }
      var showCity = document.getElementById("cityName");
      showCity.innerHTML = response.name;

      var todaysdate = document.getElementById("topDate");
      todaysdate.innerHTML = "(" + dateformat + ")";

      var skyCondition = document.getElementById("skyCond");
      skyCondition.setAttribute('src', 'https://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png')

      var currentTemp = document.getElementById("Temp");
      var tempInt = Math.round(response.main.temp);
      currentTemp.innerHTML = "Temperature: " + tempInt + "F";

      var humiditi = document.getElementById("Humid");
      var humidString = response.main.humidity.toString();
      humiditi.innerHTML = "Humidity: " + humidString + "%";

      var windspeed = document.getElementById("windSpeed");
      var windFixed = response.wind.speed.toFixed(1);
      windspeed.innerHTML = "Wind Speed: " + windFixed + "MPH";

      //location 
      var lat = response.coord.lat;
      var lon = response.coord.lon;

      //UV index request with location parameters from the first fetch
      return fetch(
        'https://api.openweathermap.org/data/2.5/uvi?appid=8eda773abbe6b913d62bbf5d3cc23857&lat=' + lat + '&lon=' + lon
      )

    })

    .then(function (response) {
      return response && response.json();
    })

    .then(function (response) {
      //return if wrong input
      if (!response) {
        return;
      }
      //set UV index and pass parameter to color it
      var uvalue = document.getElementById("UV");
      uvalue.innerHTML = response.value;
      setUVcolor(response.value);
    })


  // request 5 day forecast
  fetch(
    'https://api.openweathermap.org/data/2.5/forecast?q=' + myCity + '&appid=8eda773abbe6b913d62bbf5d3cc23857&units=imperial'
  )

    .then(function (response) {
      return response.json();
    })

    .then(function (response) {
      //return if wrong input
      if (!response.list) {
        return;
      }

      // 5 days with records every 3 hours. 40 records. Loop to find the correct date
      var arreyindex = 0;
      var currentDateNum = Number(dateformat.slice(2, 4));

      //fill first day
      while (currentDateNum + 1 > Number(response.list[arreyindex].dt_txt.slice(8, 10))) {

        arreyindex++;
      }
      var todaysdate = document.getElementById("fiDate");
      todaysdate.innerHTML = response.list[arreyindex].dt_txt.slice(5, 7) + "/" + response.list[arreyindex].dt_txt.slice(8, 10) + "/" + response.list[arreyindex].dt_txt.slice(0, 4);

      var skyConditioncol = document.getElementById("fiSky");
      skyConditioncol.setAttribute('src', 'http://openweathermap.org/img/wn/' + response.list[arreyindex].weather[0].icon + '@2x.png')

      var todaystemp = document.getElementById("fiTemp");
      todaystemp.innerHTML = "Temp: " + Math.round(response.list[arreyindex].main.temp) + "F";

      var todayshumid = document.getElementById("fiHumid");
      todayshumid.innerHTML = "Humidity: " + response.list[arreyindex].main.humidity + "%";


      //fill second day
      while (currentDateNum + 2 > Number(response.list[arreyindex].dt_txt.slice(8, 10))) {

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
      while (currentDateNum + 3 > Number(response.list[arreyindex].dt_txt.slice(8, 10))) {

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
      while (currentDateNum + 4 > Number(response.list[arreyindex].dt_txt.slice(8, 10))) {

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
      while (currentDateNum + 5 > Number(response.list[arreyindex].dt_txt.slice(8, 10))) {

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
    })

}


// set UV index color 
function setUVcolor(uvindex) {
  document.getElementById("UV").style.backgroundColor = "gray";

  if (uvindex < 3) {
    document.getElementById("UV").style.backgroundColor = "green";
  };

  if (uvindex >= 3 && uvindex < 6) {
    document.getElementById("UV").style.backgroundColor = "gold";
  };

  if (uvindex >= 6 && uvindex < 8) {
    document.getElementById("UV").style.backgroundColor = "orange";
  };

  if (uvindex >= 8 && uvindex < 11) {
    document.getElementById("UV").style.backgroundColor = "red";
  };

  if (uvindex >= 11) {
    document.getElementById("UV").style.backgroundColor = "violet";
  };

}


// add new city weather on click
var newCity;
function addnewCity() {

  newCity = document.getElementById("locationinput").value;

  myFunction();
}


// load search history
function searchHistory() {

  //clear previous
  var cityHis = JSON.parse(localStorage.getItem("localstoreCity"));

  var node = document.getElementById("city-container");
  node.querySelectorAll('*').forEach(n => n.remove());


  // load
  for (var i = 0; i < cityHis.length; i++) {

    var newdiv = document.createElement("DIV");
    newdiv.setAttribute("class", "new-div");

    var innertext = document.createTextNode(cityHis[i]);
    newdiv.appendChild(innertext);

    document.getElementById("city-container").appendChild(newdiv);
  }

}

