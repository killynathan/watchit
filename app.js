var http = require('http');
var express = require('express');
var app = express();

app.use(express.static(__dirname));

var port = process.env.PORT || 3000;
var server = http.createServer(app);

console.log("server running on port " + port);
server.listen(port);