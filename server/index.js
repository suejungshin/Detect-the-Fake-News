var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
const Promise = require('bluebird');
var items = require('../database-mongo/index.js');

const requestPost = Promise.promisify(request.post);

var app = express();

let result = {};
let score = 0;

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
          result = { true: data1, false: data2 }
          getAllFakeBoxRatings();
          res.json(result);
        }
      });
    }
  });
});

const getFakeBoxRating = async (content) => {
  let result;
  return requestPost('http://localhost:8080/fakebox/check', { form: { content: content } }, async function (error, response, body) {
    let bodyParsed = JSON.parse(body);
    let decision = bodyParsed.content.decision;
    console.log('decision', decision)
    if (decision === 'bias') {
      result = 'FALSE';
    } else if (decision === 'impartial') {
      result = 'TRUE';
    } else if (decision === 'unsure') {
      result = null;
    }
    console.log('result', result)
    return result;
  });
}

const getAllFakeBoxRatings = async () => {
  for (let i = 0; i < result.true.length; i++) {
    let content = result.true[i].original_article_text_phase2;
    await getFakeBoxRating(content).then((rating) => {
      if (rating === 'TRUE') {
        score += 10;
      }
    })
  }
  for (let i = 0; i < result.false.length; i++) {
    let content = result.false[i].original_article_text_phase2;
    await getFakeBoxRating(content).then((rating) => {
      if (rating === 'FALSE') {
        score += 10;
      }
    });

  }
  console.log(score)
  return score;
}

app.get('/aiScore', function (req, res) {
  res.json(score);
});


app.listen(3000, function () {
  console.log('listening on port 3000!');
});

