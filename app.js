// 2017-07-06
// Developing a RESTful API with Node, Express, and MongoDB - code along!
// https://www.meetup.com/Node-js-Denver-Boulder/events/241090116/

var express = require('express');
var bodyParser = require('body-parser');
var monk = require('monk');

var app = express();
var port = process.env.PORT || 3000; // Heroku: process.env.PORT
var mongoURI = process.env.MONGODB_URI;
var db = monk(mongoURI || 'localhost/gameslocker');
var games = db.get('games');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// var store = [];

app.get('/api/games', function (req, res, next) {
  //res.json({'key': 'value'});
  games.find({})
  .then(function (games) {
    res.json(games);
  })
  .catch(function (err) {
    res.json(err);
  });
});

app.post('/api/games', function (req, res, next) {
  //store.push(req.body);
  //res.json(req.body);
  games.insert(req.body)
  .then(function (game) {
    res.json(game);
  })
  .catch(function (err) {
    res.json(err);
  });
});

app.delete('/api/games/:id', function (req, res, next) {
  var id = req.params.id;

  games.findOneAndDelete({_id: id})
  .then(function (game) {
    res.json({status: 'deleted'});
  })
  .catch(function (err) {
    res.json(err);
  });
});

app.listen(port, function () {
  console.log('api listening on port ' + port);
});
