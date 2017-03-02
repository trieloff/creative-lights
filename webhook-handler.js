var request = require('request-promise');

var api_key = "8d06fe64c9ea43b4a41adf9348dec9ae"

function changeColor(color) {
	return request({"method":"POST", "uri": "http://maker.ifttt.com/trigger/" + color + "/with/key/bLghUjKHwCSv9rqZeXdSxq"});
}

function getColors(assetUrn, token) {
	return request({
		"method":"GET", 
		"uri": "https://cc-api-storage-stage.adobe.io/id/" + assetUrn + "/:metadata", 
		"headers": {"x-api-key": api_key, "Authorization": "Bearer " + token, "Accept": "application/vnd.adobe.file+json"}, 
		"json": true}).then(function(body) {
			console.log(body.kuler.rgb);
		});
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