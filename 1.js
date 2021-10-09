const api = {
  key: "dec567ece64b62a210e2a024be5e24aa",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};
const searchbox = document.querySelector(".search-box");
let PressKey = (evt) => {
  if (evt.keyCode == 13) {
    getResult(searchbox.value);
  }
};
searchbox.addEventListener("keypress", PressKey);

const getResult = (query) => {
  fetch(`${api.baseurl}weather?q=${query}&appid=${api.key}`)
    .then((response) => {
      return response.json();
    })
    .then(displayresult);
};
const displayresult = (data) => {
  console.clear();
  console.log(data);

  let city = document.querySelector(".location .city");
  city.innerHTML = `${data.name}, ${data.sys.country}`;

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(data.main.temp) - 273}<span>c</span>`;
  let weather_el = document.querySelector(".weather");
  weather_el.textContent = data.weather[0].main;
  let hilow = document.querySelector(".hi-lo");
  hilow.innerHTML = `${Math.round(data.main.temp_min) - 273}c / ${Math.round(data.main.temp_max) - 273}c`;
};
