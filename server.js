
var express = require("express");
var Syslog = require("node-syslog");
var app = express();

app.use(app.router); // you need this line so the .get etc. routes are run and if an error within, then the error is parsed to the ned middleware (your error reporter)
app.use(function(err, req, res, next) {
    if(!err) return next(); // you also need this line
    Syslog.init("node-syslog-test", Syslog.LOG_PID | Syslog.LOG_ODELAY, Syslog.LOG_LOCAL0);
    Syslog.log(Syslog.LOG_ERR, err.stack);
    Syslog.close();
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


app.get('/*.(js|css|png|jpg|mp3|woff|ttf|gif)', function(req, res){
  res.sendfile(__dirname + '/assets'+req.url);
});

app.listen(80);