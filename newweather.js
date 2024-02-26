function displayTemperature(response) {
  let tempElement = document.querySelector("#temp");
  let temp = response.data.temperature.current;
  tempElement.innerHTML = Math.round(temp);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = displayDate(date);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src = "${response.data.condition.icon_url}" />`;

  fetchForecast(response.data.city);
}
function displayDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes},`;
}

function searchCity(cityvalue) {
  let apiKey = "9t5ad1f99b16o30764016f75c42ec833";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityvalue}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayCity(event) {
  event.preventDefault();
  let submitElement = document.querySelector("#form-submit-input");

  searchCity(submitElement.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function fetchForecast(city) {
  let apiKey = "9t5ad1f99b16o30764016f75c42ec833";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast">
    <div class="weather-forecast-day">${formatDay(day.time)}</div>
    <div >
    <img src ="${day.condition.icon_url}" class="weather-forecast-icon"/>
    </div>
    <div class="weather-forecast-temperatures">
    <div class="weather-forecast-min-temperature">${Math.round(
      day.temperature.minimum
    )}º </div>
    <div class="weather-forecast-max-temperature"> 
    <strong>${Math.round(day.temperature.maximum)}º</strong></div>
    </div>
    </div>`;
    }
  });

  let forecastElement = document.querySelector("#daily-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let formElement = document.querySelector("#submit-form");
formElement.addEventListener("submit", displayCity);
searchCity("Pretoria");
