function writeToScreen(data) {
  document.getElementById("iScreen").value += data;
}

function calculate(expresion) {
  expresion = expresion.replace(/[^0-9.\/\+\-\*]/g, "");
  document.getElementById("iScreen").value = eval(expresion);
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
