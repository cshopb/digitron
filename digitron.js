var plusMinusPosition = 0;
var plusMinusSwitchedOn = false;

function plusMinusMovePosition(char) {
  char = Number(char);
  if (isNaN(char)) {
    plusMinusPosition = 0;
    plusMinusSwitchedOn = false;
  } else {
    plusMinusPosition += 1;
  }
}

function writeToScreen(data) {
  plusMinusMovePosition(data);
  if (!plusMinusSwitchedOn) {
    document.getElementById("iScreen").value += data;
  } else {
    document.getElementById("iScreen").value =
            document.getElementById("iScreen").value.slice(0,-1) + data + ")";
  }
}

function plusMinusPress(expression) {
  let firstString = expression.slice(0, -plusMinusPosition);
  let secondString;

  if (plusMinusSwitchedOn) {
    secondString = expression.slice(-plusMinusPosition + 2, -1);
    plusMinusPosition -= 3; // we removed 3 characters from the expression
    plusMinusSwitchedOn = false;
    return firstString + secondString;
  } else if (isNaN(expression.slice(-1)) == false) {
    secondString = expression.slice(-plusMinusPosition);
    plusMinusPosition += 3; // we added 3 new characters to the expression
    plusMinusSwitchedOn = true;
    return firstString + "(-" + secondString + ")";
  } else {
    return expression;
  }
}

function calculate(expression) {
  expression = expression.replace(/[^0-9\.\/\+\-\*\(\)]/g, "");
  //https://stackoverflow.com/questions/10473994/javascript-adding-decimal-numbers-issue
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
  expression = Math.round(eval(expression) * 1e12) / 1e12;
  if (Number.isFinite(expression)) {
    document.getElementById("iScreen").value = expression;
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

// refactored Event listeners
// https://davidwalsh.name/event-delegate
// https://developer.mozilla.org/en-US/docs/Web/API/Event/target

document.getElementById("digitron").addEventListener("click", function(e) {
  if (e.target && e.target.className == "toScreen") {
    writeToScreen(e.target.textContent);
  }
});

var button = [];

button["equal"] = document.getElementById("bEqual");
button["ce"] = document.getElementById("bCE");
button["mc"] = document.getElementById("bMC");
button["madd"] = document.getElementById("bMAdd");
button["mr"] = document.getElementById("bMR");
button["plusminus"] = document.getElementById("bPlusMinus");

button["ce"].addEventListener("click",
      function () {
        document.getElementById("iScreen").value = "";
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

button["plusminus"].addEventListener("click",
      function () {
        document.getElementById("iScreen").value =
                plusMinusPress(document.getElementById("iScreen").value);
      });

button["equal"].addEventListener("click",
      function () {
        calculate(document.getElementById("iScreen").value);
      });

// Get elements and add event listeners

// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
// //https://stackoverflow.com/questions/19586137/addeventlistener-using-for-loop-and-passing-values
// for (i = 0; i < 10; i++) {
//   button[i] = document.getElementById("b" + i);
//   let k = i;
//   button[i].addEventListener("click",
//            function(){
//              writeToScreen(k);
//            });
// }
//
//
// button["plus"] = document.getElementById("bPlus");
// button["minus"] = document.getElementById("bMinus");
// button["multiply"] = document.getElementById("bMultiply");
// button["devide"] = document.getElementById("bDevide");
// button["dot"] = document.getElementById("bDot");

//
// button["plus"].addEventListener("click",
//       function () {
//         writeToScreen("+");
//       });
//
// button["minus"].addEventListener("click",
//       function () {
//         writeToScreen("-");
//       });
//
// button["multiply"].addEventListener("click",
//       function () {
//         writeToScreen("*");
//       });
//
// button["devide"].addEventListener("click",
//       function () {
//         writeToScreen("/");
//       });
//
// button["dot"].addEventListener("click",
//       function () {
//         writeToScreen(".");
//       });
