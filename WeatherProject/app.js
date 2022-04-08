//jshint esversion: 6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  console.log(req.body);
  const query = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;
  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on("data", (data) => {
      const weather = JSON.parse(data);
      const weatherTemp = weather.main.temp;
      const weatherDescription = weather.weather[0].description;
      const cityName = weather.name;
      const icon = weather.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(iconURL);
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write(
        "<h1>The temperature in " + cityName + " is: " + weatherTemp + " degree Celcius</h1>"
      );
      res.write(`<img src=${iconURL}>`);
      res.send();
    });
  });



  // res.send("Server is up and running");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
