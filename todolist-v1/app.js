//jshint esversion: 8

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

console.log(date);

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const items = [];
const workItems = [];

app.get("/", function(req, res) {
  const day = date.getDate();
  res.render("list", {listTitle: day, items: items});
});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work", items: workItems});
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.post("/", function(req, res) {
  const item = req.body.newItem;
  console.log(item);
  console.log(item === "");
  if (req.body.list === "Work") {
      if (item === "") res.redirect("/work");
      else {
        workItems.push(item);
        res.redirect("/work");
      }
  } else {
      if (item === "") res.redirect("/");
      else {
        items.push(item);
        res.redirect("/");
      }
  }
});

// listen
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port " + 3000);
});
