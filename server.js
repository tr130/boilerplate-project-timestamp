// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const dateformat = require('dateformat')

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

// if no date parameter, return current date and time
app.get("/api", function (req, res) {
    let date = new Date()
    res.json({unix:date.valueOf(), utc:date.toUTCString()});
})

//main date endpoint
app.get("/api/:date?", function (req,res) {
  //if unix timestamp provided
  if (req.params.date.length == 13) {
    let timestamp = Number(req.params.date);
    let date = new Date(timestamp);
    res.json({unix:timestamp, utc:date.toUTCString()});
  } 
  //if date string provided
  else {
    let date = new Date(req.params.date);
    //check for invalid dates
    if (date == 'Invalid Date') {
      res.json({error: 'Invalid Date'});
  } else {
    res.json({unix:date.valueOf(), utc:date.toUTCString()});
  }}
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
