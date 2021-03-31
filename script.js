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
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

time.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}`;

//

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
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  highElement.innerHTML = Math.round(response.data.main.temp_max);
  lowElement.innerHTML = Math.round(response.data.main.temp_min);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src", getIcon(response.data.weather[0].icon));
}

let apiKey = "e89047cc8f695d58e8c95206ac2e49fe";
let city = "Dublin,IE";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

//define icons
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
