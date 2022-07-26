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

function dispalayTemperature(response) {
  let temperaturaElement = document.querySelector(".main-temp");
  let cityElement = document.querySelector("#cityName");
  let humidityElement = document.querySelector("#currenthum");
  let windElement = document.querySelector("#currentwind");
  let descriptionElement = response.data.weather[0].description;
  let dateElement = document.querySelector("#currentdate");
  let iconElement = document.querySelector(".main-emoji");
  temperaturaElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function seach(city) {
  let apiKey = "2f7f11cce544f115af9a2c80b2a612b4";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(dispalayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#citySeaching");
  seach(input.value);
}
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
