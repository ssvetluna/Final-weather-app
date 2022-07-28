function formatDate(timeStamp) {
  let date = new Date(timeStamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Tuesday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function changeWeatherBackground(descriptionElement) {
  if (
    descriptionElement === "light rain" ||
    descriptionElement === "clear sky" ||
    descriptionElement === "few clouds"
  ) {
    document.getElementsByClassName(`card`)[0].style.background =
      "rgb(222, 212, 115, 0.8)";
  } else {
    if (
      descriptionElement === "scattered clouds" ||
      descriptionElement === "broken clouds"
    ) {
      document.getElementsByClassName(`card`)[0].style.background = "#DEDEDE";
    } else {
      document.getElementsByClassName(`card`)[0].style.background =
        "rgb(116, 141, 166, 0.8)";
    }
  }
}

function getForecast(coordinates) {
  let apiKey = "2f7f11cce544f115af9a2c80b2a612b4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecastDays);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperaturaElement = document.querySelector(".main-temp");
  let cityElement = document.querySelector("#cityName");
  let humidityElement = document.querySelector("#currenthum");
  let windElement = document.querySelector("#currentwind");
  let descriptionElement = response.data.weather[0].description;
  let dateElement = document.querySelector("#currentdate");
  let iconElement = document.querySelector(".main-emoji");
  changeWeatherBackground(descriptionElement);
  mainTemp = Math.round(response.data.main.temp);
  temperaturaElement.innerHTML = mainTemp;
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  console.log(response.data.weather);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.cord);
}
function seach(city) {
  let apiKey = "2f7f11cce544f115af9a2c80b2a612b4";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayTemperature);
}
let mainTemp = null;
seach("Kyiv");

function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#citySeaching");
  seach(input.value);
}
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function farengeitConvert(event) {
  event.preventDefault();
  let tempFarengeit = document.querySelector("#main-temp");
  tempFarengeit.innerHTML = Math.round((mainTemp * 9) / 5 + 32);
  document.getElementsByClassName(`farengeit`)[0].style.color = "#282f36";
  document.getElementsByClassName(`celsius`)[0].style.color = "#ffffff";
}
let farengeit = document.querySelector("#farengeit");
farengeit.addEventListener("click", farengeitConvert);

function celsiusConvert(event) {
  event.preventDefault();
  let tempCelsius = document.querySelector("#main-temp");
  tempCelsius.innerHTML = Math.round(mainTemp);
  document.getElementsByClassName(`celsius`)[0].style.color = "#282f36";
  document.getElementsByClassName(`farengeit`)[0].style.color = "#ffffff";
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusConvert);

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayTemperature);
}

function showNavigation(relative) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentCity = document.querySelector("#current");
currentCity.addEventListener("click", showNavigation);

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["1", "2", "3", "4", "5", "6"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
        <div class="weater-forecast-time">19:00</div>
        <image
                src="http://openweathermap.org/img/wn/50d@2x.png"
                id="forecast-time-image"
        ></image>
        <div class="weater-forecast-time-temp">26°</div>
    </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayForecastDays(response) {
  let forecastElementDays = document.querySelector("#forecastdays");
  let forecastHTMLDays = "";
  let days = ["1", "2", "3", "4", "5", "6"];
  days.forEach(function (day) {
    forecastHTMLDays =
      forecastHTMLDays +
      `
    <div class="card" id="forecastbase">
        <span class="weater-forecast-date">Friday Jul 7</span>
        <image
            src="http://openweathermap.org/img/wn/50d@2x.png"
            id="forecast-image"
        ></image>
        <span class="forecast-temp-max">26°</span>
        <span class="forecast-temp-min">18°</span>
     </div>
  `;
  });
  forecastElementDays.innerHTML = forecastHTMLDays;
}
displayForecast();
displayForecastDays();
