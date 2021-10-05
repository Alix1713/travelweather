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
                    var apiUrlTwo = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data[0].lat + '&lon=' + data[0].lon + '&appid=c3e83b5a2578b3ee1dad8bfa2622f702' //array bracket notation
                    fetch(apiUrlTwo) //feeding second api with lat + lon
                        .then(function (dataTwo) {
                            dataTwo.json().then(function (jsondata) { //jsondata.city.daily[0]
                                console.log(jsondata);
                            })

                        })
                })
            } else {
                alert('Error: ' + response.statusText);
            }
        });
};

var displayForecast = function (city, searchTerm) { //forecast
    if (city === 0) {
        cityContainerEl.textContent = 'No city matched that search'; //city
        //   return;
        //uhhhhhhh
    }

    citySearchTerm.textContent = searchTerm; //city

    //for (var i = 0; i < cities.length; i++) {
    //    var cityName = cities[i].lat[long] + '/' + cities[i].name; //here

    var cityEl = document.createElement('a'); //city
    cityEl.classList = 'list-item flex-row justify-space-between align-center'; //city
    cityEl.setAttribute('href', './single-repo.html?repo=' + cityName); //city reponame? html?

    var titleEl = document.createElement('span'); //title
    titleEl.textContent = cityName;  //cityname
    cityEl.appendChild(titleEl); //city
    var statusEl = document.createElement('span');
    cityEl.appendChild(statusEl); //city
    cityContainerEl.appendChild(cityEl);//city
}

inputFormEl.addEventListener('submit', formSubmitHandler); //input form


//need something to convert lat and long to place name
//    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + place + '/&appid=0a5f5b7f09f88b7816e900fb3bf640c4'; //did I add key right

//http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}
//http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=60.99&lon=30.9&dt=1586468027&appid={API key}