
'use strict';
// Constant declarations
const d = document;
const form = d.getElementById("main-form")
const count = d.getElementById("ledCount");
const v = d.getElementById("voltage");
const five = d.getElementById("5vled");
const twelve = d.getElementById("12vled");
const calcButton = d.getElementById("calculate");
const clearButton = d.getElementById("clear");

// Variable declarations
var ledCount = 0;
var is5volt;
var stripType;
var maxAmp, avgAmp, maxWatt, avgWatt;
var submitted;
var selectedV;

// Error handling
class InputError extends Error {}

// Called on body load to initialize the form
function setup() {
  setV();setPI();setPS();submitted=false;
  if (submitted) {
    calcButton.disabled = true;
    clearButton.disabled = false;
  } else {
    calcButton.disabled = false;
    clearButton.disabled = true;
  }
}

// Called on "CLEAR" clicked, resets form and text values
function clearForm() {
  setPI();setPS();form.reset();submitted=false;
  calcButton.disabled = false;
  clearButton.disabled = true;
}

clearButton.addEventListener("click", event => {
  clearForm();
})

// Set Voltage functions selects 5V or 12V based on input from user
function setV() {
  is5volt = (v.value === "5");
  stripType = (is5volt) ? five.value : twelve.value;
  d.getElementById('5vled').style.display = (is5volt) ? "inline":"none";
  d.getElementById('12vled').style.display = (is5volt) ? "none":"inline";
  selectedV = v.value;
}

// Called on "SUBMIT" clicked - calculates max and avg power
//   and prints the values to the screen. Suggests a power supply
//   and power injection points.
function submitForm() {
  calculate(ledCount, v.value, stripType);
  let recA = Math.round(((maxAmp / 2) + ((maxAmp / 2) * 0.20))); // recommended PS amperage
  let recW = Math.round(((maxWatt / 2) + ((maxWatt / 2) * 0.20))); // recommended PS wattage (V*A)=W
  d.getElementById("ampsA").value = avgAmp;
  d.getElementById("ampsM").value = maxAmp;
  d.getElementById("wattsA").value = avgWatt;
  d.getElementById("wattsM").value = maxWatt;
  setPS(selectedV, recA, recW, false);
  // d.getElementById("cVolt").innerHTML = (`${v.value}V`); // selected voltage from form
  // d.getElementById("cAmp").innerHTML = (`${recA}A`);
  // d.getElementById("cWatt").innerHTML = (`(${recW}W)`);
  submitted = true;
  calcButton.disabled = true;
  clearButton.disabled = false;
  avgAmp=0;maxAmp=0;avgWatt=0;maxWatt=0;
}

// Prevent page from reloading on submit
form.addEventListener("submit", event => {
  submitForm();
  event.preventDefault();
})

// Set initial Power Injection values
function setPI() {
  const basePI = ("150");
  d.getElementById("powerInjection").innerHTML = basePI;
}

// Set initial Power Supply values
function setPS(volt, amp, watt, init = true) {
  const baseVolt = ("Example: 5V");
  const baseAmp = ("10A");
  const baseWatt = ("(50W)");
  d.getElementById("cVolt").innerHTML = (init) ? baseVolt: (`${volt}V`);
  d.getElementById("cAmp").innerHTML = (init) ? baseAmp: (`${amp}A`);
  d.getElementById("cWatt").innerHTML = (init) ? baseWatt: (`${watt}W`);
}

// set the variable ledCount to the value entered by the user
function setLed() {
  if (count.value.length < 1) return;
  try {
    let isNumber = !isNaN(parseInt(count.value)); // check if input is a number
    if (isNumber) {
      ledCount = parseInt(count.value); // change the string to int
    } else {
      throw new InputError(count.value + " is not a number!"); // input is not a number
    }
  } catch (e) {
    if (e instanceof InputError) { // input is not a number
      console.error("Not a valid number!"); // show error somehow
    } else { // some other error
      throw e;
    }
  }
}

// prevent ALL non-number values from being input
count.addEventListener("keydown", event => {
  var invalidChars = ["-", "+", "e", "E", "."];
  if (invalidChars.includes(event.key)) {
    event.preventDefault();
  }
});

// Calculations from ledCount, voltage, type
function calculate(lc, v, t) {
  let strip = (v==5) ? strip5v : strip12v;
  let type = parseInt(t);
  maxAmp = (lc * strip[type].maxP);
  avgAmp = (lc * strip[type].avgP);
  maxWatt = (maxAmp * v);
  avgWatt = (avgAmp * v);
  maxAmp = parseFloat((maxAmp.toFixed(2)));
  avgAmp = parseFloat((avgAmp.toFixed(2)));
  maxWatt = parseFloat((maxWatt.toFixed(2)));
  avgWatt = parseFloat((avgWatt.toFixed(2)));
  console.log(`maxAmp ${maxAmp}`);
  console.log(`avgAmp ${avgAmp}`);
  console.log(`maxWatt ${maxWatt}`);
  console.log(`avgWatt ${avgWatt}`);
}

function handleChange() {
  let oldVolt = v.value;
  let olsStrip = (is5volt) ? five.value : twelve.value;
}

// Enable/Disable the calculate button - enabled by default
function enCalc(input = true) {
  if (!input) {
    calcButton.disabled = true;
  }
}

// Enable/Disable the clear button - disabled by default
function enClear (input = false) {
  if (input) {
    clearButton.disabled = true;
  }
}

// LED STRIP OBJECTS
const strip5v = {
  1: {
    type: "WS2812b",
    voltage: 5,
    maxP: 0.045,
    avgP: 0.0175,
  },
  2: {
    type: "WS2812b-Eco",
    voltage: 5,
    maxP: 0.0312,
    avgP: 0.131,
  },
  3: {
    type: "APA102",
    voltage: 5,
    maxP: 0.0588,
    avgP: 0.0233,
  },
  4: {
    type: "SK6812",
    voltage: 5,
    maxP: 0.0327,
    avgP: 0.0147,
  },
}

const strip12v = {
  1: {
    type: 'WS2811',
    votage: 12,
    maxP: 0.0208,
    avgP: 0.0100,
  },
  2: {
    type: 'WS2815',
    voltage: 12,
    maxP: 0.01361,
    avgP: 0.0100,
  },
  3: {
    type: 'GS8208',
    voltage: 12,
    maxP: 0.0169,
    avgP: 0.0100,
  },
  4: {
    type: 'SK6812',
    voltage: 12,
    maxP: 0.01306,
    avgP: 0.0100,
  }
}


// let i = 100;
// let s = "Hello";

// function hello(ok) {
//   for (let i in ok) {
//     let me = i;
//     return me;
//   }
// }

// class texting {

// }

// function checkForCharacters(inputString, checkString, startingIndex) {

//   if (!startingIndex) {
// 	  startingIndex = 0;
//   }
//   return inputString.indexOf(checkString);
// }

// function isNotaNumber (inputString) {
//   return isNaN(inputString);
// }

// function isNumberInt(inputString) {

//   return (!isNaN(parseInt(inputString))) ? true : false;
// }

// function stringToLowercase(inputString) {
//   return inputString.toLowerCase();
// }

// function maxLength(inputString, inputLength) {

//   return (inputString.length <= inputLength) ? true : false;
// }

// function minLength(inputString,inputLength) {
//   return (inputString.length >= inputLength) ? true : false;
// }

// function stringToInteger (inputString) {
//   return parseInt(inputString);
// }

// /* Returns viewport's width */
// function getViewportWidth() {

//     if (window.innerWidth) {
//   /* Returns Window's width excluding toolbars/scrollbars */
//         return window.innerWidth;
//     } else if (document.body && document.body.offsetWidth) {
//   /* Returns viewable width of document,
//   including padding, border and scrollbar, but not the margin */
//         return document.body.offsetWidth;
//     } else {
//         return 0;
//     }
// }

// /* Returns window's height */
// function getViewportHeight() {

//     if (window.innerHeight) {
//   /* Returns Window's height excluding toolbars/scrollbars */
//         return window.innerHeight;
//     } else if (document.body && document.body.offsetHeight) {
//   /* Returns viewable height of document,
//   including padding, border and scrollbar, but not the margin */
//         return document.body.offsetHeight;
//     } else {
//         return 0;
//     }
// }

// /* Returns screen's total height & width */
// function getScreenResolution() {
//  return {
//   height: (screen.height)? screen.height : undefined,
//   width: (screen.width)? screen.width : undefined
//  };
// }

// /* Returns coordinates of the mouse pointer relative to the current window, for the given mouse event.
//    Example, onclick="coords = getMouseCoordinates(event)" or onmousemove="coords = getMouseCoordinates(event)"
// */
// function getMouseCoordinates(event) {
//     var x = (event.clientX)? event.clientX : undefined;
//     var y = (event.clientY)? event.clientY : undefined;

//  return { x: x, y: y };
// }
