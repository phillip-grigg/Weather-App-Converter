const slider = document.getElementById("temp-slider-el");

const currentTempDisplay = document.getElementById("current-temp-el");

const currentTempF = document.getElementById("current-temp-f-el");

let currentTemp = 1;

slider.addEventListener("mousemove", function () {
  currentTemp = slider.value;
  currentTempDisplay.value = currentTemp;
  currentTempF.value = Math.round(currentTemp * 1.8 + 32);
});

currentTempDisplay.addEventListener("click", resetTempInputs);
currentTempF.addEventListener("click", resetTempInputs);

function resetTempInputs() {
  currentTempDisplay.value = "";
  currentTempF.value = "";
}

currentTempDisplay.addEventListener("keypress", changeALLTemps);
currentTempF.addEventListener("keypress", changeALLTemps);

function changeALLTemps() {}

// if (e.key === "Enter") {
//  slider.value = currentTempDisplay.value;
//  currentTempF.value = Math.round(slider.value * 1.8 + 32);
// }
