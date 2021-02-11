
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
