// ----- variables -----
const cityForm = document.getElementById("form-el");
const card = document.getElementById("card-el");
const details = document.getElementById("details-el");
const time = document.getElementById("time-el");
const icon = document.getElementById("icon-el");
const locationCity = document.getElementById("location-el");
const slider = document.getElementById("temp-slider-el");
const currentTempDisplay = document.getElementById("current-temp-el");
const currentTempF = document.getElementById("current-temp-f-el");
let currentTemp = 1;
let sliderChange = 0;
let setCurrentTempF = "";
let setCurrentTempC = "";
// ----- update info from weather api -----
const updateUI = (data) => {
  const cityDets = data.cityDets;
  const weather = data.weather;
  locationCity.innerHTML = cityDets.EnglishName + "," + cityDets.Country.ID;
  console.log(cityDets);
  currentTempDisplay.value = weather.Temperature.Metric.Value;
  currentTempF.value = weather.Temperature.Imperial.Value;
  slider.value = weather.Temperature.Metric.Value;
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);
  let timeSrc = null;
  if (weather.IsDayTime) {
    timeSrc = "img/day.svg";
  } else {
    timeSrc = "img/night.svg";
  }
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return {
    cityDets: cityDets,
    weather: weather,
  };
};
// ----- weather form -----
cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});

// ----- slider -----

slider.addEventListener("mousemove", function () {
  sliderChange = slider.value;
  if (sliderChange > 0 || sliderChange < 0) {
    currentTemp = slider.value;
    currentTempDisplay.value = currentTemp;
    setCurrentTempF = currentTemp * 1.8 + 32;
    currentTempF.value = parseFloat(setCurrentTempF.toFixed(1));
    sliderChange = 0;
  }
});

slider.addEventListener("mousedown", function () {
  removeCity();
});

// ----- set up C and F -----

currentTempDisplay.addEventListener("click", resetTempInputs);
currentTempF.addEventListener("click", resetTempInputs);

// reset inputs
function resetTempInputs() {
  removeCity();
  currentTempDisplay.value = "";
  currentTempF.value = "";
  slider.value = 0;
}

currentTempDisplay.addEventListener("keypress", changeALLTempsUsingC);
currentTempF.addEventListener("keypress", changeALLTempsUsingF);

// set inputs from C
function changeALLTempsUsingC(e) {
  removeCity();
  if (e.key === "Enter") {
    setCurrentTempF = currentTempDisplay.value * 1.8 + 32;
    currentTempF.value = parseFloat(setCurrentTempF.toFixed(1));
    slider.value = currentTempDisplay.value;
  }
}
// set inputs from F
function changeALLTempsUsingF(e) {
  removeCity();
  if (e.key === "Enter") {
    setCurrentTempC = (currentTempF.value - 32) / 1.8;
    currentTempDisplay.value = parseFloat(setCurrentTempC.toFixed(1));
    slider.value = currentTempDisplay.value;
  }
}
// remove api city info
function removeCity() {
  locationCity.innerHTML = "Custom Temperature";
  const iconSrc = "";
  icon.setAttribute("src", iconSrc);
}
