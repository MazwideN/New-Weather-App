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
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.city;
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = displayDate(date);
  console.log(response.data);
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

let formElement = document.querySelector("#submit-form");
formElement.addEventListener("submit", displayCity);
searchCity("Pretoria"); //this city will be applied when the page is loaded
