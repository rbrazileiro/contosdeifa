
var express = require("express");
var Syslog = require("node-syslog");
var app = express();

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


app.get('/*.(js|css|png|jpg|mp3|woff|ttf|gif)', function(req, res){
  res.sendfile(__dirname + '/assets'+req.url);
});
Syslog.init("node-syslog-test", Syslog.LOG_PID | Syslog.LOG_ODELAY, Syslog.LOG_LOCAL0);
Syslog.log(Syslog.LOG_INFO, "news info log test");
Syslog.log(Syslog.LOG_ERR, "news log error test");
Syslog.log(Syslog.LOG_DEBUG, "Last log message as debug: " + new Date());
Syslog.close();

app.listen(80);