// "use strict";

const url = "http://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "e94a50e2e99555c9694b04842d08a572"; // Replace "APIKEY" with your own API key; otherwise, your HTTP request will not work
let state = {}; //To save the satate of the objects and later updating the DOM

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

function updateUISuccess(response) {
  console.log("action success");
  //Getting Celsius and Fahrenhite for the weather condition
  const degC = response.main.temp - 273.15;
  const degCInt = Math.floor(degC);
  const degF = degC * 1.8 + 32;
  const degFInt = Math.floor(degF);
  state = {
    //set the state base on the recived information
    condition: response.weather[0].main,
    //icon comes from openweathermap.org
    icon:
      "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png",
    degCInt: Math.floor(degCInt),
    degFInt: Math.floor(degFInt),
    city: response.name,
  };
  //find the location where weather condtion supposed to be displayed
  const into = document.querySelector(".conditions");
  //Update widget with new elements
  let container = document.createElement("div");
  let cityPara = document.createElement("p");
  cityPara.setAttribute("class", "city"); //giving class "city" to cityPara to style it later
  cityPara.textContent = state.city; //get city from the state and set it to cityPara as plain text

  let conditionsPara = document.createElement("p");
  //get weather condtion in Celsius from the state and set it to conditionsPara as plain text
  //also add unicode for celsius "\u00B0 C / " and Fahrenhite " \u00B0 F / "
  conditionsPara.textContent =
    state.degCInt + "\u00B0 C / " + state.degF + " \u00B0 F / ";

  let iconImage = document.createElement("img");
  //adding icon image source to img element
  iconImage.setAttribute("src", state.icon);
  //adding alt attribute for image
  iconImage.setAttribute("alt", state.condition);
  /*
   * Now we're going to build our HTML, the order we append these elements,
   * determinds the order they will be displayed on the UI
   */
  conditionsPara.appendChild(iconImage); //iconImage will be appended as a child to condiotnsPara paragraph
  container.appendChild(cityPara); // add cityPara ans a child element to container Pragraph
  container.appendChild(conditionsPara); // add condiotnsPara ans a child element to container Pragraph
  console.log(container);
  if (document.querySelector(".conditions div")) {
    into.replaceChild(container, document.querySelector(".conditions div"));
  } else {
    into.appendChild(container);
  }
}

function updateUIFailure() {
  console.log("failed");
  // $(".conditions").text("Weather information unavailable");
}

function updateWeather() {}
