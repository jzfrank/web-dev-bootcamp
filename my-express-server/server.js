//jshint esversion:6

const express = require('express');

const app = express();

app.get("/", function(req, res) {
  console.log(req);
  res.send("<h1>Hello, world!</h1><br> <h2>Well</h2>");
});

app.get("/contact", function (req, res) {
  res.send("Contact me: angela@gmail.com");
});

app.get("/about", function (req, res) {
  res.send("Hi There, it's Jin");
});

app.get("/tt", function (req, res) {
  res.send("<ul><li>Coffee</li><ul>");
});

app.listen(3000, function() {
  console.log("server started in port 3000");
});
