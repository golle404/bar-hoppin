var path = require("path");
var express = require('express');
var session = require("express-session");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
var favicon = require('serve-favicon');

var passport = require("passport");
var TwitterStrategy = require("passport-twitter").Strategy;

var app = express();
var router = require("./routes/router.js");

// strategies
var strategies = require("./controllers/oauth.js");

app.use(morgan('dev')); 
app.use(cookieParser());
//app.use(bodyParser());
//session
app.use(session({
	secret: 'barehoppingsession',
	resave: false,
	saveUninitialized: false
}));

//passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);

// using jade as template engine
app.set('views', path.join(__dirname, '/views'));
app.set("view engine", "jade");

app.use(favicon(path.join(__dirname, '../public/favicon.ico')));
// static routes
app.use(express.static(path.join(__dirname, '../public')));


var port = process.env.PORT || 3333;
app.listen(port,function(){
	console.log("Server running at port " + port);
})
