// Time Display

let now = new Date();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let time = document.querySelector(".time");
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let currentDay = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

time.innerHTML = `${currentDay} ${date} ${month} ${hours}:${minutes}`;

// Weather display
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "e89047cc8f695d58e8c95206ac2e49fe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector(".temperature");
  let cityElement = document.querySelector("#city-display");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let highElement = document.querySelector("#high");
  let lowElement = document.querySelector("#low");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  highElement.innerHTML = Math.round(response.data.main.temp_max);
  lowElement.innerHTML = Math.round(response.data.main.temp_min);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src", getIcon(response.data.weather[0].icon));

  getForecast(response.data.coord);
}

let apiKey = "e89047cc8f695d58e8c95206ac2e49fe";
let city = "Dublin,IE";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

//Define Icons

function getIcon(icon) {
  let iconElement = "";
  if (icon === "03d" || icon === "03n") {
    iconElement = "images/cloud-sun-solid.svg"; //scattered clouds day/night
  } else if (icon === "04d") {
    iconElement = "images/cloud-sun-solid.svg"; //broken clouds day
  } else if (icon === "04n") {
    iconElement = "images/cloud-moon-solid.svg"; //broken clouds night
  } else if (icon === "01d") {
    iconElement = "images/sun-solid.svg"; //clear day
  } else if (icon === "01n") {
    iconElement = "images/moon-solid.svg"; //clear night
  } else if (icon === "02d") {
    iconElement = "images/cloud-sun-solid.svg"; //partly cloudy day
  } else if (icon === "02n") {
    iconElement = "images/cloud-moon-solid.svg"; //partly cloudy night
  } else if (icon === "09d") {
    iconElement = "images/cloud-sun-rain-solid.svg"; //showers day
  } else if (icon === "09n") {
    iconElement = "images/cloud-moon-rain-solid.svg"; //showers night
  } else if (icon === "10d") {
    iconElement = "images/cloud-rain-solid.svg"; //mod-heavy rain day
  } else if (icon === "10n") {
    iconElement = "images/cloud-rain-solid.svg"; //rain night
  } else if (icon === "11d") {
    iconElement = "images/bolt-solid.svg"; //thunderstorm day
  } else if (icon === "11n") {
    iconElement = "images/bolt-solid.svg"; //thunderstorm night
  } else if (icon === "13d") {
    iconElement = "images/snowflake-regular.svg"; //snow day
  } else if (icon === "13n") {
    iconElement = "images/slowflake-regular.svg"; //snow night
  } else if (icon === "50d") {
    iconElement = "images/smog-solid.svg"; //mist day
  } else if (icon === "50n") {
    iconElement = "images/smog-solid.svg"; //mist night
  }
  return iconElement;
}

// Search Form

let searchForm = document.querySelector(".form");
searchForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  let cityElement = document.querySelector("#city-display");
  cityElement.innerHTML = `${city}`;
  search(city);
}

function search(city) {
  let apiKey = "e89047cc8f695d58e8c95206ac2e49fe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

//Current Location button

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  console.log(position);
  let apiKey = "e89047cc8f695d58e8c95206ac2e49fe";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

// Celsius to Fahrenheit conversion

let celsiusTemperature = null;

let temperatureFahrenheit = document.querySelector("#fahrenheit-link");
temperatureFahrenheit.addEventListener("click", makeFahrenheit);

function makeFahrenheit(event) {
  event.preventDefault();
  temperatureCelsius.classList.remove("active");
  temperatureFahrenheit.classList.add("active");
  let tempToFahrenheit = document.querySelector(".temperature");
  let temperature = (celsiusTemperature * 9) / 5 + 32;
  tempToFahrenheit.innerHTML = Math.round(temperature);
}

let temperatureCelsius = document.querySelector("#celsius-link");
temperatureCelsius.addEventListener("click", makeCelsius);

function makeCelsius(event) {
  event.preventDefault();
  temperatureCelsius.classList.add("active");
  temperatureFahrenheit.classList.remove("active");
  let tempToCelsius = document.querySelector(".temperature");
  tempToCelsius.innerHTML = Math.round(celsiusTemperature);
}

// Forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let maxTemp = null;
  let minTemp = null;

  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `    
<div class="col-4 day">
          ${formatDay(forecastDay.dt)} </br> </br>
        </div>
      
        <div class="col-4 id=forecast-emoji" style="padding-right: 0px; padding-top: 6px; padding-left: 20px;">
          <img src="${getIcon(
            forecastDay.weather[0].icon
          )}" id="forecast-icon"  /> </br> </br> 
        </div>

        <div class="col-4 temp">
         ${(maxTemp = Math.round(forecastDay.temp.max))}°C |   
          <span id=minTemp>${(minTemp = Math.round(
            forecastDay.temp.min
          ))}°C</span></br> </br> 
      </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

search("Dublin,IE");
