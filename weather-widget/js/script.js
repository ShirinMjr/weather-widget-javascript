"use strict";

const url = "http://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = ""; // Replace "APIKEY" with your own API key; otherwise, your HTTP request will not work
let state = {}; //To save the satate of the objects and later updating the DOM

//add event listener for forcast button
document.querySelector(".forecast-button").addEventListener(
  "click",
  function (e) {
    console.log("Event", e);
    e.preventDefault(); //it prevents the default behavior of the button or form to catch the event before submitting the form and refreshing the page
    //getting the value of the location form the #lcoation box
    const location = document.querySelector("#location").value;
    //reset the value of the #location box to an empty string after storing the entered value
    document.querySelector("#location").value = "";
    document.querySelector(".conditions").textContent = ""; //Clear the previous result/message if it exists
    //now we can call the weather api using fetch
    fetch(url + location + "&appid=" + apiKey) //gets resolved first
      .then(function (response) {
        /* getting the JOSN out of the response body
         * response.json() is a promis itselfe
         * which needs to get resolve so we need to pass it to another function.
         */
        return response.json();
      })
      .then(function (response) {
        console.log("Response", response);
        updateUISuccess(response); //If response was successful, we populate the UI with requested data
      })
      .catch(function () {
        updateUIFailure(); //If response failed, display a message for user
      });
  },
  false
);

function updateUISuccess(response) {
  console.log("action success");
  //Calculating Celsius and Fahrenheit for the weather condition
  const degC = response.main.temp - 273.15;
  const degCInt = Math.floor(degC);
  const degF = degC * 1.8 + 32;
  const degFInt = Math.floor(degF);
  state = {
    //set the state base on the recived information
    condition: response.weather[0].main,
    // getting the icon that comes from openweathermap.org and setting it to icon
    icon:
      "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png",
    degCInt: Math.floor(degCInt),
    degFInt: Math.floor(degFInt),
    city: response.name,
    description: response.weather[0].description,
  };
  //find the location where weather condtion supposed to be displayed
  const into = document.querySelector(".conditions");
  //Update widget with new elements
  let container = document.createElement("div"); //Creating div element and save the refrnce in container
  let cityPara = document.createElement("p"); //Creating p element and save the refrence in cityPara
  cityPara.setAttribute("class", "city"); //giving class "city" to cityPara(p tag) to style it later
  cityPara.textContent = state.city; //get city from the state and set it as text inside cityPara(p tag)

  let conditionsPara = document.createElement("p"); //Creating p element and save the refrence in conditionsPara
  //get weather condition in Celsius from the state and set it to conditionsPara as plain text
  //also add Unicode for Celsius  "\u00B0 C / " and Fahrenheit " \u00B0 F / "
  conditionsPara.textContent = `${state.degCInt} \u00B0 C / ${state.degFInt} " \u00B0 F / `;

  let weatherDescription = document.createElement("p"); //Creating a p for weather description
  weatherDescription.textContent = state.description; //setting the text content of the weather description

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
  container.appendChild(cityPara); // add cityPara as a child element to container Pragraph
  container.appendChild(conditionsPara); // add condiotnsPara as a child element to container Pragraph
  container.appendChild(weatherDescription); // add weatherDescription as a child element to container Pragraph
  console.log(container); //see the generated elements in the console
  if (document.querySelector(".conditions div")) {
    into.replaceChild(container, document.querySelector(".conditions div"));
  } else {
    into.appendChild(container);
  }
}

function updateUIFailure() {
  console.log("failed");
  document.querySelector(".conditions").textContent =
    "Weather information unavailable";
}
