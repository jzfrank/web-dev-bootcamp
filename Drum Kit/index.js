var btns = document.querySelectorAll(".drum");
var numOfButton = btns.length;

for (var i=0; i<numOfButton; i++) {
  btns[i].addEventListener("click", function() {
    var key = this.textContent;
    buttonAnimation(key);
    makesound(key);
  })
}


document.addEventListener("keydown", function (e) {
  var key = e.key;
  buttonAnimation(key);
  makesound(key);
})

function makesound(key) {
  switch (key) {
    case "w":
      var crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;
    case "a":
      var kick = new Audio("sounds/kick-bass.mp3");
      kick.play();
      break;
    case "s":
      var snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;
    case "d":
      var t1 = new Audio("sounds/tom-1.mp3");
      t1.play();
      break;
    case "j":
      var t2 = new Audio("sounds/tom-2.mp3");
      t2.play();
      break;
    case "k":
      var t3 = new Audio("sounds/tom-3.mp3");
      t3.play();
      break;
    case "l":
      var t4 = new Audio("sounds/tom-4.mp3");
      t4.play();
      break;
    default:
        console.log("key other than main keys gets pressed");

  }
}

function buttonAnimation (currentKey) {
  var activeButton = document.querySelector("." + currentKey);
  console.log(activeButton.classList);
  activeButton.classList.toggle("pressed");
  setTimeout(() => { activeButton.classList.toggle("pressed"); }, 100);
}
