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


var inputFormEl = document.querySelector('#input-form'); //done
var placeInputEl = document.querySelector('#place'); //done
var cityContainerEl = document.querySelector('#city-container'); //done
var citySearchTerm = document.querySelector('#city-search-term'); //done

var formSubmitHandler = function (event) { //done
    event.preventDefault(); //done

    var location = placeInputEl.value.trim(); //done

    if (location) { //var
        getTravel(location); //var & travel
        cityContainerEl.textContent = ''; //city
        placeInputEl.value = ''; //place
    } else {
        alert('Please enter a location'); //alert
    }
};

var getTravel = function (place) {
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + place + '&appid=c3e83b5a2578b3ee1dad8bfa2622f702'; //lat and long


    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    //                  displayForecast(data, place); //forecast
                    var apiUrlTwo = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data[0].lat + '&lon=' + data[0].lon + '&appid=c3e83b5a2578b3ee1dad8bfa2622f702&units=imperial' //array bracket notation
                    fetch(apiUrlTwo) //feeding second api with lat + lon
                        .then(function (dataTwo) {
                            dataTwo.json().then(function (jsondata) { //jsondata.city.daily[0]
                                console.log(jsondata);
                                forecast(jsondata.daily[0])
                            })
                        })
                })
            } else {
                alert('Error: ' + response.statusText);
            }
        });
};
var forecast = function (currentForecast) {
    console.log(currentForecast);
    var currentWeatherContainer = `
    <div class="card">
  <div class="card-body">
    <h5 class="card-title">Forecast for : ${new Date(currentForecast.dt * 1000).toLocaleDateString()}</h5>
    <h6 class="card-subtitle mb-2">Low Temp: </h6>
    <h6 class="card-subtitle mb-2">High Temp: </h6>
    <h6 class="card-subtitle mb-2">UV Index: </h6>
    <h6 class="card-subtitle mb-2">Wind Speed: </h6>
    <h6 class="card-subtitle mb-2">Humidity: </h6>
    
  </div>
</div>
    `
    cityContainerEl.innerHTML = currentWeatherContainer
}
//{
//   "dt": 1633374000,
// "temp": {
//     "day": 298.74,
//     "min": 290.24,
//     "max": 300.57,

//how do I loop this??!?!?!?!?!! I need 7 days not one

var displayForecast = function (city, searchTerm) { //forecast
    if (city === 0) {
        cityContainerEl.textContent = 'No city matched that search'; //city

    }
    citySearchTerm.textContent = searchTerm; //city
    var cityEl = document.createElement('a'); //city
    var titleEl = document.createElement('span'); //title
    titleEl.textContent = cityName;  //cityname
    cityEl.appendChild(titleEl); //city
    var statusEl = document.createElement('span');
    cityEl.appendChild(statusEl); //city
    cityContainerEl.appendChild(cityEl);//city
}

inputFormEl.addEventListener('submit', formSubmitHandler); //input form
//myStorage = window.localStorage;
//localStorage.setItem('Forecast');
//Storage.setItem(forecast);

