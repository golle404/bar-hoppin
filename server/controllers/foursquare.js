var request = require("request");
var config = require("../config/foursquare-config.js");
var db = require("./db.js");

module.exports.search = function(req, res){
	var reqStr = config.hostname
	reqStr += "&near="
	reqStr += req.params.place
	reqStr += "&client_id=" + config.client_id;
	reqStr += "&client_secret=" + config.client_secret;
	console.log(reqStr)
	req.session.search = req.params.place;
	request.post(
	    reqStr,
	    function (error, response, body) {
	        if (!error && response.statusCode == 200) {
	        	var data = JSON.parse(body);
	        	res.json(data);
	        }else{
	        	res.json({error: error, code: response.statusCode});
	        }
	    }
	);
}