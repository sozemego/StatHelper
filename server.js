var express = require("express");
var path = require("path");

var app = express();

var htmlDir = path.resolve(__dirname, "public");
var publicPath
var imgPath = path.resolve(__dirname, "public/img");
var cssPath = path.resolve(__dirname, "public/css");

app.listen(8080);

app.use(express.static("public"));
//app.use(express.static("public/img"));

app.get("/", function(req, res) {
	res.sendFile(path.join(htmlDir, "home.html"));
});

app.get("/app", function(req, res) {
	res.sendFile(path.join(htmlDir, "app.html"));
});
