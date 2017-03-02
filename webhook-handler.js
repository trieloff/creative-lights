var https = require("https");


function changeColor(color) {
	var options = {
		"host":"maker.ifttt.com",
		//"host":"example.com",
		"path":"/trigger/" + color + "/with/key/bLghUjKHwCSv9rqZeXdSxq",
		"method":"GET"
	};
	https.request(options, function(res){
		console.log(res);
		console.log("Request has been made");
	}).end();
}

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
			changeColor("red");
			return {"color":"red"};
		} else if (params.asset.mime_type=="image/png") {
			changeColor("green");
			return {"color":"green"};
		} else {
			return {"color":"blue"};
		}
	} else {
		return {"echo": params};	
	}
}