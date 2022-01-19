// -------------------------
//   GLOBAL VARIABLES
// -------------------------
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

var apiKey = 'c9f1d008018a1c7896a5f42383fc54fe';
var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#city');
var dashboardEl = document.querySelector('#dashboard');
var forecastEl = document.querySelector('#forecast');

// -------------------------
//   FUNCTIONS
// -------------------------
// Get city from search input
var formSubmitHandler = function (event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  if (city) {
    getCityLatLng(city);
    cityInputEl.value = '';
  } else {
    alert(
      'Please enter the name of a city. For best results, include the state (ex. Orlando, FL)'
    );
  }
};

var getCityLatLng = function (city) {
  // Format the geocode API URL
  var apiLocUrl =
    'http://api.openweathermap.org/geo/1.0/direct?q=' +
    city +
    ',US&limit=1&appid=' +
    apiKey;

  // Make a request to the URL
  fetch(apiLocUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data[0]);
        getWeatherData(data[0].lat, data[0].lon, data[0].name);
      });
    } else {
      alert(
        'City not found. For best results, include the city and state (ex. Orlando, FL)'
      );
    }
  });
};

var getWeatherData = function (lat, lon, city) {
  var apiWeatherUrl =
    'https://api.openweathermap.org/data/2.5/onecall?lat=' +
    lat +
    '&lon=' +
    lon +
    '&exclude=minutely,hourly&appid=' +
    apiKey;

  fetch(apiWeatherUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data, city);
        });
      } else {
        alert('Something went wrong!');
      }
    })
    .catch(function () {
      alert('Unable to connect to OpenWeather.');
    });
};

var displayWeather = function (data, city) {
  console.log(data);

  // Create the current conditions dashboard
  var cityNameEl = document.createElement('h2');
  cityNameEl.textContent = city;
  dashboardEl.append(cityNameEl);
};

// -------------------------
//   EVENT LISTENERS
// -------------------------
cityFormEl.addEventListener('submit', formSubmitHandler);
