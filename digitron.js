function writeToScreen(data) {
  document.getElementById("iScreen").value += data;
}

function calculate(expresion) {
  expresion = expresion.replace(/[^0-9\.\/\+\-\*]/g, "");
  //https://stackoverflow.com/questions/10473994/javascript-adding-decimal-numbers-issue
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
  expresion = Math.round(eval(expresion) * 1e12) / 1e12;
  if (Number.isFinite(expresion)) {
    document.getElementById("iScreen").value = expresion;
  } else {
    window.alert("Division with zero is not allowed.")
  }
}

function memory(data) {
  if (data == "clear") {
    localStorage.removeItem("memory");
  } else if (data == "recall") {
    if (!localStorage.getItem("memory")) {
      localStorage.setItem("memory", 0);
    }
    writeToScreen("");
    return localStorage.getItem("memory");
  } else {
    let temp = data;
    data = Number(temp) + Number(localStorage.getItem("memory"));
    localStorage.setItem("memory", data);
  }
}

// Get elements and add event listeners

var button = [];

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
//https://stackoverflow.com/questions/19586137/addeventlistener-using-for-loop-and-passing-values
for (i = 0; i < 10; i++) {
  button[i] = document.getElementById("b" + i);
  let k = i;
  button[i].addEventListener("click",
           function(){
             writeToScreen(k);
           });
}


button["plus"] = document.getElementById("bPlus");
button["minus"] = document.getElementById("bMinus");
button["multiply"] = document.getElementById("bMultiply");
button["devide"] = document.getElementById("bDevide");
button["equal"] = document.getElementById("bEqual");
button["ce"] = document.getElementById("bCE");
button["dot"] = document.getElementById("bDot");
button["mc"] = document.getElementById("bMC");
button["madd"] = document.getElementById("bMAdd");
button["mr"] = document.getElementById("bMR");

button["plus"].addEventListener("click",
      function () {
        writeToScreen("+");
      });

button["minus"].addEventListener("click",
      function () {
        writeToScreen("-");
      });

button["multiply"].addEventListener("click",
      function () {
        writeToScreen("*");
      });

button["devide"].addEventListener("click",
      function () {
        writeToScreen("/");
      });

button["equal"].addEventListener("click",
      function () {
        calculate(document.getElementById("iScreen").value);
      });

button["ce"].addEventListener("click",
      function () {
        document.getElementById("iScreen").value = "";
      });

button["dot"].addEventListener("click",
      function () {
        writeToScreen(".");
      });

button["mc"].addEventListener("click",
      function () {
        memory("clear");
      });

button["mr"].addEventListener("click",
      function () {
        document.getElementById("iScreen").value = memory("recall");
      });

button["madd"].addEventListener("click",
      function () {
        memory(document.getElementById("iScreen").value);
      });
