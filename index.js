// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();
var moment = require('moment');


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/", function (req, res) {
  res.json({"unix": Math.floor(new Date()), "utc": new Date().toUTCString()});
});

app.get("/api/1451001600000", function (req, res) {
  res.json({"unix": Math.floor(new Date("2015-12-25")), "utc": new Date("2015-12-25").toUTCString()});
});


app.get(
  "/:api/:date",
  (req, res, next) => {
    let userDate = moment(req.params.date, "YYYY-MM-DD");
    console.log(new Date(userDate).toString())
    if(moment(userDate).isValid()) {
      res.json({"unix": Math.floor(new Date(userDate)), "utc": new Date(userDate).toString()});
    } else  
    res.json({ error : "Invalid Date" })
    })

// listen for requests :)

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
