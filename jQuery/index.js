// $("h1").click(function() {
//   $("h1").css("color", "purple");
// });

$("button").click(function() {
  $("h1").css("color", "green");
});

$("input").keypress(function(e) {
  // console.log(e.key);
  $("h1").text($("h1").text() + e.key);
});

$("h1").on("mouseover", function() {
  $("h1").css("color", "blue");
  $("h1").fadeOut();
});
