function throwDice() {
  return Math.floor(Math.random() * 6) + 1;
}

var p1 = throwDice();
var p2 = throwDice();
document.getElementById("img1").setAttribute("src", "./images/dice" + p1 + ".png")
document.getElementById("img2").setAttribute("src", "./images/dice" + p2 + ".png")

var title = document.getElementById("headline");
if (p1 > p2) {
  title.textContent = "🚩Player1 Wins!";
}
else if (p1 < p2) {
  title.textContent = "Player2 Wins! 🚩";
}
else {
  title.textContent = "It's a tie, try again!";
}
