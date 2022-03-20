//jshint esversion: 8

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB");

const wikiSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article = new mongoose.model("article", wikiSchema);

/////////////////// request targetting articles ///////////////////////

app.route("/articles")
  .get(
    (req, res) => {
      Article.find({}, (err, docs) => {
        if (err) return console.log(err);
        console.log(docs);
        res.send(docs);
      });
    }
  )
  .post(
    (req, res) => {
      console.log(req.query);
      const title = req.query.title;
      const content = req.query.content;
      const article = new Article({
        title: title,
        content: content
      });
      article.save((err) => {
        if (err) res.send(err);
        else res.send("Done!");
      });
    }
  )
  .delete(
    (req, res) => {
      Article.deleteMany({}, (err) => {
        if (err) res.send(err);
        else res.send("Successfully deleted all articles!");
      });
    }
  );


////////////////// request targetting specific articles //////////////////////

app.route("/articles/:articleTitle")
  .get(
    (req, res) => {
      const articleTitle = req.params.articleTitle;
      Article.findOne({ title: articleTitle }, (err, doc) => {
        if (err) console.log(err);
        else {
          if (!doc) res.send(articleTitle + " <em>Not found!</em>");
          else res.send(doc);
        }
      });
    }
  )
  .put(
    (req, res) => {
      Article.replaceOne(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        (err) => {
          if (err) console.log(err);
          else res.send("Updated Successfully!");
        }
      );
    }
  )
  .patch(
    (req, res) => {
      Article.update(
        {title: req.params.articleTitle},
        {$set: req.body},
        (err) => {
          if (err) res.send(err);
          else res.send("Article Updated Successfully!");
        }
      );
    }
  )
  .delete(
    (req, res) => {
      Article.deleteOne(
        {title: req.params.articleTitle},
        (err) => {
          if (err) res.send(err);
          else res.send(req.params.articleTitle + " Delete Successfully!");
        }
      );
    }
  );

console.log(Article.find({}, function (err, docs) {
  if (err) return console.log(err);
  console.log(docs);
}));





app.listen(3000, ()=>{
  console.log("Server started on port 3000");
});
