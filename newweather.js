function displayCity(event) {
  event.preventDefault();
  let submitElement = document.querySelector("#form-submit-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = submitElement.value;
}

let formElement = document.querySelector("#submit-form");
formElement.addEventListener("submit", displayCity);
