//jshint esversion:8

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB');

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "what's the name of the fruit?"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({ name: "Apple", rating: 8, review: "Pretty solid as a fruit"});

const banana = new Fruit({
  name: "Banana",
  score: 3,
  review: "wierd texture"
});

const organge = new Fruit ({
  name: "Orange",
  review: "Too sour"
});

const peach = new Fruit ({
  name: "peach",
  rating: 8,
  review: "peaches are nice"
});

// Fruit.insertMany(
//   [
//     peach
//   ],
//   function (err, docs) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       console.log("success");
//       console.log(docs);
//     }
//   }
// );

// Fruit.insertMany(
//   [banana, organge],
//   function (err, docs) {
//     if (err) console.log(err);
//     else console.log("Successfully inserted many");
//   }
// );

// Fruit.find({}, function(err, fruits){
//   if(err) {
//     console.log(err);
//   }
//   else {
//     mongoose.connection.close();
//     fruits.forEach(function (f) {
//       console.log(f.name);
//     });
//     // console.log(fruits);
//   }
// });
//
// Fruit.deleteOne(
//   {name: "peach"}, function (err) {
//     if (err) console.log(err);
//     else console.log("Successfully deleted");
//   }
// );

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit ({
  name: "Pineapple",
  score: 9,
  review: "Great Fruit"
});

// pineapple.save();
//
// const person = new Person({
//   name: "Amy",
//   age: 12,
//   favouriteFruit: pineapple
// });

// let apple;
// console.log(Fruit.find({name: "Apple"}, function(err, doc) {
//   if (err) console.log(err);
//   else {
//     console.log(doc);
//   }
// }));

Person.update({name: "Snow"},
  { $set: {favouriteFruit: organge} },
  function(err) {
    if (err) console.log(err);
    else console.log("success!");
  }
);

// person.save();
