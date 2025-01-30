// create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var commentsPath = 'comments.json';

// create a static server
app.use(express.static(__dirname));
app.use(bodyParser.json());

// get comments from comments.json
app.get('/api/comments', function(req, res) {
  fs.readFile(commentsPath, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

// post comments to comments.json
app.post('/api/comments', function(req, res) {
  fs.readFile(commentsPath, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    var newComment = {
      id: Date.now(),
