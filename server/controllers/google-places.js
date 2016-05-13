var request = require("request");
var config = require("../config/google-places-config.js");
var db = require("./db.js");

module.exports.search = function(req, res){
	var reqStr = config.hostname
	reqStr += "?query=bars+in+"
	reqStr += req.params.place
	reqStr += "&key=" + config.key;
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

module.exports.photoProxy = function(req, res){
	var url = config.photoHost + "&photoreference=" + req.params.ref + "&key=" + config.key;
	request.get(url).pipe(res);
}