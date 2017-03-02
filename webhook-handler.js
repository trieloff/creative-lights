var request = require('request-promise');
var crypto = require('crypto');
var api_key = "8d06fe64c9ea43b4a41adf9348dec9ae"


// Part of https://github.com/chris-rock/node-crypto-examples

// Nodejs encryption with CTR

var algorithm = 'aes-256-ctr';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text, password){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}
 
var secrettoken = "17fbd37507663bf4508cc745a689856084a9148e7478aa8715f8e845efdc37e979a5f51f914439bcdba0d53e5d72e16a4645347bc334568e036aade14f8ac6de900c87f559bef3d973164640ba6e7832eba52287123fe38483c495e3df1f4ace3a72cc6314dbfcf573fa82781cc5502e389bbd78e2b3866e042b0a82ee1380aab5b3a937fa777858aac75ae3e13c0a86e4082806e6bb1ee4357d2e6db7657e9baae353411aec309c2c23735a17f9298a2b0bb6b60648180cae0e130af184412f8a391ec5cd130bcdd702b2451a22713ceeefe2d8f0e2eaa3587195d382a7c1d34a8fa94ee2053777ef111efc2c32b5c1f96a438332de3a51f5cb61fa4814abc409883e113fb603698534a0f8ed2e80e2eaf4338825812a8864ca85d77ddb5075214e7f4f3e89afcc06ff0fe574db0d45194391a00ef5950e90622004083ddb7d667399ea78d1bdf0b4d6190164f996b594ad73d97124f219b04275152f8c809bc91af302dab293c701d9cd5af77695d8254c2c6f0cf0c8480c68eb056f4480112b2200961fbc7626edb27f0a4c4ffd9192014d99153717929685705af88f4d01297cd090feb4641663d391f2ce6cf6b4d9d995c8524a25e07da8d1484356bc64bf68b5e936531577d077162769385ca94ba774c3fd4188488adc6bfddbb351eef3434010e147aa58326a6d525a1eb86bf8000288572b679e48b685a64c57525d1897800a90bc61357ca8847d510f3bac2d15363022ff7281e693a214d8f020d4db386e058cf4182a1bbaadbfebe76d88b097f5d8d5fb1659b027cdd802c21f833dd5d754d21b315d80bbb53fb05f07b200ddc982e7446fe6ce01c5c2cbc3df21e28adbb9df75c18a831cbb1a822e488404eecd0386aa267d08488884858bdd437e077bf1e52d93f79f5333427f3901e2506899805a1ce6d6cee00cddf160ec13c45b8cea011b7a692bd79ae7ac62a236322f34a160bfb4468d70002f8eeb8a529e34a0d45f173c99aa3aed681255c41c3904e71694ed4bda4e8ed4af3bef4c2b9023022efbf3b44d4101abca3ad823ebb2f3d24d4af25a02b47def0f538bf88fd6f0c2f95e188f090d98edf26b122eab77dceee81eb9fbfd8ecd710e3a851e538da168cd1439f22eab868ba03a8c3c14288d70059db448550b713a20123350d9bd9503275184b60e454c743c310dd3e32fc88bd783f0c78c632646c9b71c899e8a5488609c4ea9b687657615c407a4e21f3c8db1c081af34ccc9c2eacbade0f764baecd720647b5cd1a26eae931eae1824560b87457c2ec1a6e5f1993547dd84dae149ef940ca29820934d105b8aa11d421b6283cb56d463e7d21c7fb47ea1a733f390cfeafbeadf53870bd09fa1f2ae7d4622fbb9b45965c0df9022a39a9a10af0946442c751c60bce6c190c24325bd4407349cd4f12373a34392bff9f24301422ae1c1ffb88e437865221e3ef4c3b5365e68b3f4cddd78d073dd41bcaa830faad7bea2a03b6bb1f3af633f786e3cd57be75c4d4892e2503b8df50f68a1fabdb8189ce2fec0f7e2bb70624ad8383a7cb30eff46b45835fcd4466f3d22c63ed8a7969bb2044b27165a8f5d3a24e712af9c45ffc50621ad6801360800c2ff5701a582156df3512f0193b1ae043eff91470384ae0920990340523bd9048dd8027ab59f0418f364a3a67438d89f93ef0ef433c7708a2f2ef6c501914f5c48c1acdd8c6d"


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
    return { "on": true, "bri": Math.round(l * 254), "hue": Math.round(h * 65535), "sat": Math.round(s * 254), "alert": "select" };
}

function getColors(assetUrn, token) {
	return request({
		"method":"GET", 
		"uri": "https://cc-api-storage-stage.adobe.io/id/" + assetUrn + "/:metadata", 
		"headers": {"x-api-key": api_key, "Authorization": "Bearer " + token, "Accept": "application/vnd.adobe.file+json"}, 
		"json": true}).then(function(body) {
			return body.kuler.rgb.map(rgb2Hue);
		});
}


//return getColors("urn:aaid:sc:eu:aec1a289-613f-452b-a1cd-3d5027626b95", );

/*
changeColor("green").then(function(body) {
	console.log("Request has been made");
	console.log(body);
});
*/

/**
 * WebHook handler for Adobe I/O Events.
 * @param challenge challenge required for registering WebHook
 */
function main(params) {
	return {
		"secret": params.secret,
		"usertoken": decrypt(secrettoken, params.secret)
	};
	
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