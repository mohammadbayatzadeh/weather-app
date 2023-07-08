const api = {
  key: "dec567ece64b62a210e2a024be5e24aa",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};
const loading = {
  name: "Loading ...",
  sys: {
    country: "",
  },
  main: {
    temp: "",
    temp_min: "",
    temp_max: "",
  },
  weather: [""],
};

const searchbox = document.querySelector(".search-box");
const city = document.querySelector(".location .city");
const temp = document.querySelector(".current .temp");
const weather_el = document.querySelector(".weather");
const hi_low = document.querySelector(".hi-lo");

searchbox.addEventListener("keypress", (evt) => {
  if (evt.keyCode == 13) {
    getResult(searchbox.value);
  }
});

const getResult = (query) => {
  displayresult(loading);

  fetch(`${api.baseurl}weather?q=${query}&appid=${api.key}`)
    .then((response) => {
      return response.json();
    })
    .then(displayresult);
};

const displayresult = (data) => {
  searchbox.value = "";
  if (data.cod === "404") {
    city.innerHTML = `city not found...`;
    return;
  }

  city.innerHTML = `${data.name}, ${data.sys.country}`;

  temp.innerHTML = data.main.temp
    ? `${Math.round(data.main.temp) - 273}<span>c</span>`
    : "";

  weather_el.textContent = data.weather[0].main && data.weather[0].main;

  hi_low.innerHTML = data.main.temp
    ? `${Math.round(data.main.temp_min) - 273}c / ${
        Math.round(data.main.temp_max) - 273
      }c`
    : "";
};

document.addEventListener("DOMContentLoaded", () => {
  getResult("ahvaz");
});
