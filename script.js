// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

//these are called "DATA TYPES" CORE CONCEPT : NEED TO GET THESE DOWN
// var string = 'trying to understand string vs array'
// var array = ['cat', string, 2] //NEEDS THOSE QUOTES, number not in quotes
// var object = {key:'value'} //label is the key right hand side is the value
// var object = {cat: 'tabby', color: 'orange', owners: ['alix', 'kate']} //example
// var number = 1 //primitive holds one value
// var boolean = true //primitive
//primitive data types have a simple value, string, number, boolean, undefined, null
//complex data types arrays and objects

var inputFormEl = document.querySelector("#input-form"); //statement keyword var is variable whats after is my call of variable
//equal sign is the assignment of the var, document is an object that has built in functions
//query selector targets the element and gets the element back
//if its part of an object its called a method
//it takes in an argument of the string and returns it
var placeInputEl = document.querySelector("#place"); //done
var cityContainerEl = document.querySelector("#city-container"); //done
var citySearchTerm = document.querySelector("#city-search-term"); //done

var formSubmitHandler = function (event) {
  //done
  event.preventDefault(); //done

  var location = placeInputEl.value.trim(); //done

  if (location) {
    //var
    getTravel(location); //var & travel
    //when this is called it immediately starts reading the getTravel function "call a function"
    //once it goes through the function it goes to the next line
    //it runs line by line unless it calls a function, then it jumps and comes back
    cityContainerEl.textContent = ""; //city
    placeInputEl.value = ""; //place
  } else {
    alert("Please enter a location"); //alert
  }
};

var getTravel = function (place) {
  var apiUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    place +
    "&appid=c3e83b5a2578b3ee1dad8bfa2622f702"; //lat and long

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        //                  displayForecast(data, place); //forecast
        var apiUrlTwo =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          data[0].lat +
          "&lon=" +
          data[0].lon +
          "&appid=c3e83b5a2578b3ee1dad8bfa2622f702&units=imperial"; //array bracket notation
        fetch(apiUrlTwo) //feeding second api with lat + lon
          .then(function (dataTwo) {
            dataTwo.json().then(function (jsondata) {
              //jsondata.city.daily[0]
              console.log(jsondata);
              forecast(jsondata.daily);
            });
          });
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};
var forecast = function (forecastWeek) {
  console.log(forecastWeek);
  var returnString = "";
  for (var i = 0; i < forecastWeek.length; i++) {
    var forecast = forecastWeek[i];
    var currentWeatherContainer = `
    <div class="card">
  <div class="card-body">
    <h5 class="card-title">Forecast for : ${new Date(
      currentForecast.dt * 1000
    ).toLocaleDateString()}</h5>
    <h6 class="card-subtitle mb-2">Low Temp: ${forecast.temp.min}</h6>
    <h6 class="card-subtitle mb-2">High Temp:${forecast.temp.max} </h6>
    <h6 class="card-subtitle mb-2">UV Index: ${forecast.uvi}</h6>
    <h6 class="card-subtitle mb-2">Wind Speed: ${forecast.wind_speed}</h6>
    <h6 class="card-subtitle mb-2">Humidity:${forecast.humidity} </h6>
  </div>
</div>
    `;
    returnString += currentWeatherContainer;
  }
  cityContainerEl.innerHTML = currentWeatherContainer;
};
//{
//   "dt": 1633374000,
// "temp": {                  ///THIS IS AN OBJECCCCTTTT!!!!!
//     "day": 298.74,
//     "min": 290.24,
//     "max": 300.57,

//how do I loop this??!?!?!?!?!! I need 7 days not one

var displayForecast = function (city, searchTerm) {
  //forecast
  if (city === 0) {
    cityContainerEl.textContent = "No city matched that search"; //city
  }
  citySearchTerm.textContent = searchTerm; //city
  var cityEl = document.createElement("a"); //city
  var titleEl = document.createElement("span"); //title
  titleEl.textContent = cityName; //cityname
  cityEl.appendChild(titleEl); //city
  var statusEl = document.createElement("span");
  cityEl.appendChild(statusEl); //city
  cityContainerEl.appendChild(cityEl); //city
};

inputFormEl.addEventListener("submit", formSubmitHandler); //input form
// myStorage = window.localStorage;
// localStorage.setItem("Forecast");
// Storage.setItem(forecastWeek);
