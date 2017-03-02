var request = require('request-promise');

var api_key = "8d06fe64c9ea43b4a41adf9348dec9ae"

function changeColor(color) {
	return request({"method":"POST", "uri": "http://maker.ifttt.com/trigger/" + color + "/with/key/bLghUjKHwCSv9rqZeXdSxq"});
}

function rgb2Hue(hex) {
	var r = parseInt(hex.substring(0, 2), 16) / 255;
	var g = parseInt(hex.substring(2, 4), 16) / 255;
	var b = parseInt(hex.substring(4, 6), 16) / 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min) {
        h = s = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }
	
	//transform into Hue's format
    return { "on": true, "bri": Math.round(l * 254), "hue": Math.round(h * 65535), "sat": Math.round(s * 254) };
}

console.log(rgb2Hsl("A5778C"));

function getColors(assetUrn, token) {
	return request({
		"method":"GET", 
		"uri": "https://cc-api-storage-stage.adobe.io/id/" + assetUrn + "/:metadata", 
		"headers": {"x-api-key": api_key, "Authorization": "Bearer " + token, "Accept": "application/vnd.adobe.file+json"}, 
		"json": true}).then(function(body) {
			console.log(body.kuler.rgb.map(rgb2Hue));
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