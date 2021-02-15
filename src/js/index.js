
'use strict';
// Constant declarations
const d = document;
// ElementId constants
// Form input elements
const form = d.getElementById("main-form")
const count = d.getElementById("ledCount");
const v = d.getElementById("voltage");
const led5vForm = d.getElementById("5vled");
const led12vForm = d.getElementById("12vled");
const calcButton = d.getElementById("calculate");
const clearButton = d.getElementById("clear");
// Form output elements
const avgAmpForm = d.getElementById("ampsA");
const avgWattForm = d.getElementById("wattsA");
const maxAmpForm = d.getElementById("ampsM");
const maxWattForm = d.getElementById("wattsM");
const psVolt = d.getElementById("psVolt");
const psAmp = d.getElementById("psAmp");
const psWatt = d.getElementById("psWatt");

// Variable declarations
var ledCount = 0;
var selectedV;
var is5volt;
var stripType;
var maxAmp, avgAmp, maxWatt, avgWatt;
var submitted;

// Error handling
class InputError extends Error {}

/** Called on body load to initialize the form */
function setup() {
  setV();setPI();setPS();submitted=false;
  enButtons(false);
}

/** Set Voltage function - selects 5V or 12V based on input from user */
function setV() {
  is5volt = (v.value === "5");
  stripType = (is5volt) ? led5vForm.value : led12vForm.value;
  led5vForm.style.display = (is5volt) ? "inline":"none";
  led12vForm.style.display = (is5volt) ? "none":"inline";
  selectedV = v.value;
}

/** Set initial Power Injection values */
function setPI() {
  const basePI = ("150");
  d.getElementById("powerInjection").innerHTML = basePI;
}

/**
 * Set Power Supply values based on the state of init and print them to the screen
 * @param volt int representing strip voltage - selected by the user
 * @param amp  float representing MAXimum required AMPS
 * @param watt float representing MAXimum required WATTS
 * @param init bool determines if values should be initialized
 */
function setPS(volt, amp, watt, init = true) {
  const baseVolt = ("Example: 5V");
  const baseAmp = ("10A");
  const baseWatt = ("(50W)");
  if (init) {
    psVolt.innerHTML = baseVolt;
    psAmp.innerHTML = baseAmp;
    psWatt.innerHTML = baseWatt;
  } else {
    let recA = Math.round(((amp / 2) + ((amp / 2) * 0.20))); // recommended PS amperage
    let recW = Math.round(((watt / 2) + ((watt / 2) * 0.20))); // recommended PS wattage (V*A)=W
    psVolt.innerHTML = (`${volt}V`);
    psAmp.innerHTML = (`${recA}A`);
    psWatt.innerHTML = (`${recW}W`);
  }
}

/**
 * Called on form.submit - calculates max and avg power
 *   and prints the values to the screen. Suggests a power supply
 *   and power injection points.
 */
function submitForm() {
  calculate(ledCount, v.value, stripType);
  avgAmpForm.value = avgAmp;
  maxAmpForm.value = maxAmp;
  avgWattForm.value = avgWatt;
  maxWattForm.value = maxWatt;
  setPS(selectedV, maxAmp, maxWatt, false);
  submitted = true;
  avgAmp=0;maxAmp=0;avgWatt=0;maxWatt=0;
}

/** Prevent page from reloading on submit */
form.addEventListener("submit", event => {
  submitForm();
  event.preventDefault();
});

/** Called on "CLEAR" clicked, resets form and text values */
function clearForm() {
  setPI();setPS();form.reset();
  avgAmpForm.value = avgAmpForm.defaultValue;
  avgWattForm.value = avgWattForm.defaultValue;
  maxAmpForm.value = maxAmpForm.defaultValue;
  maxWattForm.value = maxWattForm.defaultValue;
  submitted=false;
}

clearButton.addEventListener("click", () => {
  clearForm();
  enButtons(false);
});

/** Set the variable ledCount to the value entered by the user */
function setLed() {
  if (count.value.length < 1) { // if input ledCount is deleted disable buttons
    if (!submitted) enClear(false);
    enCalc(false);
    return;
  }
  try {
    let isNumber = !isNaN(parseInt(count.value)); // check if input is a number
    if (isNumber) {
      ledCount = parseInt(count.value); // change the string to int
      enButtons(true);                  // enable buttons on valid input
    } else {
      throw new InputError(count.value + " is not a number!"); // input is not a number
    }
  } catch (e) {
    if (e instanceof InputError) {      // input is not a number
      console.error("Not a valid number!");
    } else {
      throw e; // some other exception
    }
  }
}

/**
 * prevent ALL non-number values from being input
 *   For a "number" input in an HTML form,
 *   the values 'e', 'E', '-', '+', and '.' are accepted
 *   as they are technically part of some numbers
 */
count.addEventListener("keydown", e => {
  var invalidChars = ["-", "+", "e", "E", "."];
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
});

/**
 * Calculates the MAX and AVG values of AMPS and WATTS
 * Converts result to floating point Number with a precision of 2
 * @param lc int representing total number of led's
 * @param v  int representing the voltage selected by the user
 * @param t  int representing the type of strip selected by the user
 */
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
  enCalc(false);
}

/**
 * Enables all buttons if select tags change and ledCount is not empty
 * @param e event object passed by event listener
 */
function selectChange(e) {
  if (count.value.length > 1) {
    if (e.target.nodeName == "SELECT") {
      enButtons(true);
    }
  }
}
form.addEventListener("change", e => {
  selectChange(e);
});

/** Enable/Disable the calculate button - disabled by default */
function enCalc(input = true) {
  calcButton.disabled = !input;
}

/** Enable/Disable the clear button - disabled by default */
function enClear (input = true) {
  clearButton.disabled = !input;
}

/** Enable/Disable all buttons */
function enButtons (input = true) {
  enClear(input);
  enCalc(input);
}

function testForm() {
  var i;
  for (i = 0; i < form.length; i++) {
    console.log(form.elements[i].id);
  }
}

/** LED STRIP OBJECTS */
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
