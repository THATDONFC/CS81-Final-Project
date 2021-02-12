
const d = document;
const v = d.getElementById("voltage");
const five = d.getElementById("5vled");
const twelve = d.getElementById("12vled");

var ledCount = 0;

// v.addEventListener("change", f => {
//   d.getElementById('5vled').style.display = (v.value === "5") ? "inline":"none";
//   d.getElementById('12vled').style.display = (v.value === "5") ? "none":"inline";
// });

function setV() {
  d.getElementById('5vled').style.display = (v.value === "5") ? "inline":"none";
  d.getElementById('12vled').style.display = (v.value === "5") ? "none":"inline";
}

// v.addEventListener("blur", f => {
//   fiveVolt = (v.value == "5");
//   d.getElementById('5vled').style.display = fiveVolt ? "inline":"none";
// });



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
