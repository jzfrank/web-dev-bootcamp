//jshint esversion:8

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// mongoose.connect("mongodb://localhost:27017/todolistDB");
mongoose.connect('mongodb+srv://admin-jin:pKbtgB9vJ5neiZcS@cluster0.zseei.mongodb.net/todolistDB?retryWrites=true&w=majority');

const itemSchema = new mongoose.Schema({
  name: String
});
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema]
});

const Item = new mongoose.model("item", itemSchema);
const List = new mongoose.model("List", listSchema);


const defaultItems = [{
    name: "Welcome to your todolist"
  },
  {
    name: "Hit the + button to add a new item"
  },
  {
    name: "<--- Hit thie to delete an item."
  }
];

app.get("/", function(req, res) {
  let items = [];
  Item.find({}, async function (err, docs) {
    console.log("docs.length", docs.length);
    if (docs.length === 0) {
      await Item.insertMany(
        defaultItems, function (err) {
          if (err) console.log(err);
          else console.log("Success!");
        }
      );
      res.redirect("/");
    } else {
      if (err) console.log(err);
      else docs.forEach(function (item) {
        items.push(item);
      });
      res.render("list", {
        listTitle: "Today",
        newListItems: items
      });
    }
  });
});

app.post("/", function(req, res) {

  const itemName = req.body.newItem;
  const listTitle = req.body.list;

  const item = new Item({
    name: itemName
  });

  console.log(item);

  if (listTitle === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listTitle}, function (err, foundList) {
      foundList.items.push(item);
      foundList.save();
    });
    res.redirect("/" + listTitle);
  }
});

app.post("/delete", function (req, res) {
  console.log(req.body);
  const listTitle = req.body.listTitle;
  const checkedItemId = req.body.checkbox;

  if (listTitle === "Today") {
    Item.findByIdAndRemove(checkedItemId, function(err) {
      if (err) {
        console.log("error:", err);
      }
      else console.log(checkedItemId, "removed");
    });
    res.redirect("/");
  } else {
    List.findOneAndUpdate(
      {name: listTitle},
      {$pull: {items: {_id: checkedItemId}}},
      function (err, foundList) {
        if (err) console.log(err);
        else console.log("Success");
      }
    );
    res.redirect("/" + listTitle);
  }
});

app.get("/:themeName", function (req, res) {
  const themeName = _.capitalize(req.params.themeName);
  List.findOne({name: themeName}, function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      if (!result) {
        console.log("not exist!");
        const list = new List({
          name: themeName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + themeName);
      }
      else {
        res.render("list", {
            listTitle: themeName,
            newListItems: result.items
        });
        console.log("exist!");
      }

    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
