var request = require('request-promise');


function changeColor(color) {
	var options = {
		"host":"maker.ifttt.com",
		//"host":"example.com",
		"path":"/trigger/" + color + "/with/key/bLghUjKHwCSv9rqZeXdSxq",
		"method":"GET"
	};
	
	return request({"method":"POST", "uri": "http://maker.ifttt.com/trigger/" + color + "/with/key/bLghUjKHwCSv9rqZeXdSxq"})
}
/*
changeColor("red").then(function(body) {
	console.log("Request has been made");
	console.log(body);
})
*/

/**
 * WebHook handler for Adobe I/O Events.
 * @param challenge challenge required for registering WebHook
 */
function main(params) {
    var challenge = params.challenge;
    if (challenge) {
		return { "challenge": challenge };
    }
	if (params.asset && params.asset.mime_type) {
		if (params.asset.mime_type=="image/jpeg") {
			return changeColor("red").then(function(body) {
				return {"color": "red", "response": body};
			});
		} else if (params.asset.mime_type=="image/png") {
			return changeColor("green").then(function(body) {
				return {"color": "green", "response": body};
			});
		} else {
			return {"color":"blue"};
		}
	} else {
		return {"echo": params};	
	}
}