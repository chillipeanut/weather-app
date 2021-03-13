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
let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

time.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}`;

//

function makeFahrenheit(event) {
  event.preventDefault();
  let tempToFahrenheit = document.querySelector(".temperature");
  let temperature = tempToFahrenheit.innerHTML;
  tempToFahrenheit.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function makeCelsius(event) {
  event.preventDefault();
  let tempToCelsius = document.querySelector(".temperature");
  let temperature = tempToCelsius.innerHTML;
  tempToCelsius.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let temperatureFahrenheit = document.querySelector("#fahrenheit-link");
temperatureFahrenheit.addEventListener("click", makeFahrenheit);

let temperatureCelsius = document.querySelector("#celsius-link");
temperatureCelsius.addEventListener("click", makeCelsius);

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city-display").innerHTML = response.data.name;
  document.querySelector("#details").innerHTML = response.data.weather[0].main;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function showPosition(position) {
  console.log(position);
  let apiKey = "e89047cc8f695d58e8c95206ac2e49fe";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  let cityName = document.querySelector("#city-display");
  cityName.innerHTML = `${city}`;
  search(city);
}

function search(city) {
  let apiKey = "e89047cc8f695d58e8c95206ac2e49fe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let searchForm = document.querySelector(".form");
searchForm.addEventListener("submit", handleSubmit);

search("Dublin");
