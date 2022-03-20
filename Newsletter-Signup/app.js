//jshint esversion: 8

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "c3ed317f70040549f5f0a669603d7f06-us14",
  server: "us14",
});

app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public" + "/signup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME:firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  console.log(jsonData);
  
  const run = async () => {
    const response = await client.lists.batchListMembers("0a50f82de1", {
      members: [{}],
    });
    console.log(response);
  };


  run();

  // const url =
  //
  // https.request(url, options, function(response) {
  //
  // });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


// api key of mailchimp
// c3ed317f70040549f5f0a669603d7f06-us14

// audience id / list id
// 0a50f82de1
