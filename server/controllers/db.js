var Firebase = require("firebase");
var config = require("../config/db-config.js");

var db = new Firebase(config.url);
db.authWithCustomToken(config.token, function(error, auth){
	if(error){
		console.log("database-error: ", error);
	}else{
		console.log("conected to firebase");
	}
})
var users = db.child("users");
var bars = db.child("bars");

module.exports.registerUser = function(username, token, done) {
	var user = null;
	users.child(token).once("value", function(snapshot) {
		if (snapshot.exists()) {
			if (snapshot.val().name === username) {
				user = {
					name: username,
					id: token
				};
			}
			done(user)
		} else {
			users.child(token).set({name:username}, function(err) {
				if (!err) {
					user = {
						name: username,
						id: token
					};
				}
				done(user)
			});
		}
	});
}

module.exports.findUserById = function(token, done) {
	var user = null;
	users.child(token).once("value", function(snapshot) {
		if (snapshot.exists()) {
			user = snapshot.val()
			user.id = token
		}
		done(user)
	});
}

module.exports.rspv = function(barRef, userRef, done){
	bars.child(barRef).child(userRef).once("value", function(snapshot){
		if(snapshot.exists()){
			bars.child(barRef).child(userRef).remove(done);
		}else{
			bars.child(barRef).child(userRef).set(true, done);
		}
	});
}

module.exports.barData = function(barRef, userRef, done){
	var resObj = {goers: 0, rsvp: false};
	bars.child(barRef).once("value", function(snapshot){
		if(snapshot.exists()){
			var snap = snapshot.val();
			for(var b in snap){
				resObj.goers++;
				if(b === userRef){
					resObj.rsvp = true;
				}
			}
		}
		done(resObj)
	})
}