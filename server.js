
var express = require("express");
var app = express();

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


app.get('/*.(js|css|png|jpg|mp3|woff|ttf)', function(req, res){
  res.sendfile(__dirname + '/assets'+req.url);
});

app.listen(80);