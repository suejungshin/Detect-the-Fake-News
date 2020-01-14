var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo/index.js');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/cards', function (req, res) {
  items.findTrueCards(function (err, data1) {
    if (err) {
      res.sendStatus(500);
    } else {
      items.findFalseCards(function (err, data2) {
        if (err) {
          res.sendStatus(500);
        } else {
          res.json({true: data1, false: data2});
        }
      });
    }
  });
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});

