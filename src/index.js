function dispalayTemperature(response) {
  let temperaturaElement = document.querySelector(".main-temp");
  temperaturaElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#cityName");
  cityElement.innerHTML = response.data.name;
  let humidityElement = document.querySelector("#currenthum");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windElement = document.querySelector("#currentwind");
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let descriptionElement = response.data.weather[0].description;
}

let apiKey = "2f7f11cce544f115af9a2c80b2a612b4";
let url = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&units=metric&appid=${apiKey}`;
axios.get(url).then(dispalayTemperature);
