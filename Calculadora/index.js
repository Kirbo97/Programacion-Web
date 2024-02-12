"use strict";

var input = document.getElementById("input"), // input/output button
  number = document.querySelectorAll(".numbers div"), // number buttons
  operator = document.querySelectorAll(".operators div"), // operator buttons
  result = document.getElementById("result"), // equal button
  clear = document.getElementById("clear"), // clear button
  resultDisplayed = false; // bandera para vigilar qué salida se muestra

// agregar controladores de clic a los botones numéricos
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function (e) {
    // almacenar la cadena de entrada actual y su último carácter en variables (usado más adelante)
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // Si el resultado no se muestra, simplemente sigue agregando
    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (
      (resultDisplayed === true && lastChar === "+") ||
      lastChar === "-" || lastChar === "×" || lastChar === "÷"
    ) {
      // si el resultado se muestra actualmente y el usuario presionó un operador
      // necesitamos seguir agregando a la cadena para la próxima operación
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      // si el resultado se muestra actualmente y el usuario presionó un número
      // necesitamos borrar la cadena de entrada y agregar la nueva entrada para iniciar la nueva operación
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }
  });
}

// agregar controladores de clic a los botones de los operadores
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function (e) {
    // almacenar la cadena de entrada actual y su último carácter en variables (usado más adelante)
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // Si el último carácter ingresado es un operador, reemplácelo con el que está presionado actualmente.
    if ( lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷" ) {
      var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      // Si la primera tecla presionada es un operador, no haga nada.
      console.log("enter a number first");
    } else {
      // de lo contrario, simplemente agregue el operador presionado a la entrada
      input.innerHTML += e.target.innerHTML;
    }
  });
}

// al hacer clic en el botón 'igual'
result.addEventListener("click", function () {
  // esta es la cadena que procesaremos, por ejemplo. -10+26+33-56*34/23
  var inputString = input.innerHTML;

  // formando una serie de números. por ejemplo, para la cadena anterior será: números = ["10", "26", "33", "56", "34", "23"]
  // ["444", "6"]
  var numbers = inputString.split(/\+|\-|\×|\÷/g);

  // formando una matriz de operadores. para la cadena anterior será: operadores = ["+", "+", "-", "*", "/"]
  // primero reemplazamos todos los números y punteamos con una cadena vacía y luego dividimos

  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");

  // ahora estamos recorriendo la matriz y realizando una operación a la vez.
  // primero divide, luego multiplica, luego resta y luego suma
  // a medida que nos movemos vamos alterando la matriz original de números y operadores
  // el elemento final que queda en la matriz será la salida

  var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    // usar parseFloat es necesario; de lo contrario, se producirá una concatenación de cadenas
    numbers.splice(
      add,
      2,
      parseFloat(numbers[add]) + parseFloat(numbers[add + 1])
    );
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; // mostrando la salida

  resultDisplayed = true; // girando la bandera si se muestra el resultado
});

// borrar la entrada al presionar clear
clear.addEventListener("click", function () {
  input.innerHTML = "";
});