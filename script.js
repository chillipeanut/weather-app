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
  let feelsLikeElement = document.querySelector("#feels-like");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  feelsLikeElement.innerHTML = `Feels Like:  ${Math.round(
    response.data.main.feels_like
  )}°C`;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  highElement.innerHTML = Math.round(response.data.main.temp_max);
  lowElement.innerHTML = Math.round(response.data.main.temp_min);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("alt", getIcon);

  iconElement.innerHTML = getIcon(response.data.weather[0].icon);

  getForecast(response.data.coord);
}

let apiKey = "e89047cc8f695d58e8c95206ac2e49fe";
let city = "St Peter Port";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

//Define Icons

function getIcon(icon) {
  let iconElement = "";
  if (icon === "03d") {
    iconElement = `<i class="fas fa-cloud-sun"></i>`; //scattered clouds day
  } else if (icon === "03n") {
    iconElement = `<i class="fas fa-cloud-moon"></i>`; //scattered clouds night
  } else if (icon === "04d") {
    iconElement = `<i class="fas fa-cloud-sun"></i>`; //broken clouds day
  } else if (icon === "04n") {
    iconElement = `<i class="fas fa-cloud-moon"></i>`; //broken clouds night
  } else if (icon === "01d") {
    iconElement = `<i class="fas fa-sun"></i>`; //clear day
  } else if (icon === "01n") {
    iconElement = `<i class="fas fa-moon"></i>`; //clear night
  } else if (icon === "02d") {
    iconElement = `<i class="fas fa-cloud-sun"></i>`; //partly cloudy day
  } else if (icon === "02n") {
    iconElement = `<i class="fas fa-cloud-moon"></i>`; //partly cloudy night
  } else if (icon === "09d") {
    iconElement = `<i class="fas fa-cloud-sun-rain"></i>`; //showers day
  } else if (icon === "09n") {
    iconElement = `<i class="fas fa-cloud-moon-rain"></i>`; //showers night
  } else if (icon === "10d") {
    iconElement = `<i class="fas fa-cloud-rain"></i>`; //mod-heavy rain day
  } else if (icon === "10n") {
    iconElement = `<i class="fas fa-cloud-rain"></i>`; //rain night
  } else if (icon === "11d") {
    iconElement = `<i class="fas fa-bolt"></i>`; //thunderstorm day
  } else if (icon === "11n") {
    iconElement = `<i class="fas fa-bolt"></i>`; //thunderstorm night
  } else if (icon === "13d") {
    iconElement = `<i class="far fa-snowflake"></i>`; //snow day
  } else if (icon === "13n") {
    iconElement = `<i class="far fa-snowflake"></i>`; //snow night
  } else if (icon === "50d") {
    iconElement = `<i class="fas fa-smog"></i>`; //mist day
  } else if (icon === "50n") {
    iconElement = `<i class="fas fa-smog"></i>`; //mist night
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
<div class="col-4 day" id="left-days">
          ${formatDay(forecastDay.dt)} </br> </br>
        </div>
      
        <div class="col-4 id=forecast-emoji" style="padding-right: 0px; padding-left: 88px; font-size: 20px;">
          <span id=#forecast-icon">${getIcon(
            forecastDay.weather[0].icon
          )}<span/> </br> </br> 
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

// Change Icon

// Background Image

search("St Peter Port");
