function playGame() {
  var userInput = confirm("Seguro que quieres jugar?");
  if (userInput == 1) {
    var num = prompt("Ingresa un número del 1 al 10:");
    if (isNaN(num)) {
      alert("Este no es un número. Adiós!");
    } else if (num < 1 || num > 10) {
      alert("El número debe de estar entre 1 y 10. Adiós!");
    } else {
      var guess = 1 + Math.floor(Math.random() * 10);
      test(num, guess);
    }
  } else {
    alert("Okay. Adiós!");
  }
}

function test(n, g) {
  for (i = 1; i < 4; i++) {
    if (n == g) {
      alert("Ganaste! El número era " + g + ".");
      return;
    } else if (i == 3) {
      alert("No tienes más intentos. El número era " + g + ". Perdiste!");
    } else if (n < g) {
      n = prompt("Muy bajo! Intenta de nuevo: ");
    } else {
      n = prompt("Muy alto! Intenta de nuevo: ");
    }
  }
}
