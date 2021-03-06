var express = require("express");
var passport = require("passport");
var googlePlaces = require("../controllers/google-places.js");
var foursquare = require("../controllers/foursquare.js");
var db = require("../controllers/db.js");
var request = require
var router = express.Router();

/// main route //////
router.get("/", function(req, res) {
	var search = req.session.search || null;
	res.render("index", {search: search});
})
//////// api ////////////
///// search
/// google places
router.post("/api/search/:place", googlePlaces.search)
////foursquare
router.post("/api/foursquare/:place", foursquare.search)
// user data
router.post('/api/user', function(req, res){
	res.json(req.user)
});
// bar data
router.post('/api/bar-data/:ref', function(req, res){
	var userId = req.user ? req.user.id : null;
	db.barData(req.params.ref, userId, function(obj){
		res.json(obj)
	})
});
// bar rsvp
router.post('/api/rspv/:ref', isLoggedIn, function(req, res){
	db.rspv(req.params.ref, req.user.id, function(){
		db.barData(req.params.ref, req.user.id, function(obj){
			res.json(obj)
		})	
	})
	
});
///////////  oauth  ////////////////////
// twitter
router.get('/auth/twitter', passport.authenticate('twitter'), function(req, res) {});
router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
})
router.get('/auth/twitter/callback',
	passport.authenticate('twitter', {
		failureRedirect: '/'
	}),
	function(req, res) {
		res.redirect('/');
	});


//image proxy
router.get('/api/image/:ref', googlePlaces.photoProxy);


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
    	console.log("auth")
    	return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;