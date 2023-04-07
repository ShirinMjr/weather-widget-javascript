// "use strict";

const url = "http://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "e94a50e2e99555c9694b04842d08a572"; // Replace "APIKEY" with your own API key; otherwise, your HTTP request will not work
//To save the satate of the objects and later updating the DOM
let state = {};
let category = "all";

//add event listener for forcast button
document.querySelector(".forecast-button").addEventListener(
  "click",
  function (e) {
    console.log("Event", e);
    e.preventDefault(); //it prevents the default behavior of the button or form to catch the event before submitting the form and refreshing the page
    //getting the value of the location form the #lcoation box
    const location = document.querySelector("#location").value;
    //reset the value of the #location box to an empty string
    document.querySelector("#location").value = "";

    fetch(url + location + "&appid=" + apiKey) //gets resolved first
      .then(function (response) {
        //
        return response.json(); //this is a promis
      })
      .then(function (response) {
        console.log("Response", response);
        updateUISuccess(response);
      })
      .catch(function () {
        updateUIFailure();
      });
  },
  false
);

//Update widget with new elements
let contaioner = document.createElement("div");
let cityPara = document.createElement("p");
cityPara.setAttribute("class", "city"); //giving class to cityPara to style it
cityPara.textContent = state.city; //get city from the state and set it to cityPara as plain text

let condiotnsPara = document.createElement("p");
//get weather condtion in Celsius from the state and set it to conditionPara as plain text
//also add unicode for celsius "\u00B0 C / " and Fahrenhite " \u00B0 F / "
conditionPara.textContent =
  state.degCInt + "\u00B0 C / " + state.degF + " \u00B0 F / ";

let iconImage = document.createElement("img");
//adding icon image source to img element
iconImage.setAttribute("src", state.icon);
//adding alt attribute for image
iconImage.setAttribute("alt", state.condition);

function updateUISuccess(response) {
  console.log("success");
  const degC = response.main.temp - 273.15;
  const degCInt = Math.floor(degC);
  const degF = degC * 1.8 + 32;
  const degFInt = Math.floor(degF);
  state = {
    condition: response.weather[0].main,
    icon:
      "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png",
    degCInt: Math.floor(degCInt),
    degFInt: Math.floor(degFInt),
    city: response.name,
  };
}

function updateUIFailure() {
  console.log("failed");
  // $(".conditions").text("Weather information unavailable");
}

function updateWeather() {}
