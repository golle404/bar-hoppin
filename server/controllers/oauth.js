var passport = require('passport');
var db = require("./db");

var TwitterStrategy = require('passport-twitter').Strategy;
var config = require("../config/oauth-config.js");

passport.use(new TwitterStrategy(config,
	function(accessToken, refreshToken, profile, done) {
		registerAccount(profile.username, accessToken, done);
	}));

// serialize and deserialize
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	db.findUserById(id, function(user) {
		if (user) {
			done(null, user);
		} else {
			done("error", null);
		}
	});
});

function registerAccount(username, token, done) {
	db.registerUser(username, token, function(user) {
		if (user) {
			return done(null, user);
		} else {
			return done("error")
		}
	})
}