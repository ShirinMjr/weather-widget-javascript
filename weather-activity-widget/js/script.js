// "use strict";

const url = "http://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = ""; // Replace "APIKEY" with your own API key; otherwise, your HTTP request will not work

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

// async function api(location) {
//   let respons = await fetch(url + location + "&appid=" + apiKey);
//   let json = await respons.json();
//   console.log(json);
// }

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
