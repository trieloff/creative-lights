var request = require('request-promise');
var crypto = require('crypto');
var api_key = "8d06fe64c9ea43b4a41adf9348dec9ae"


// Part of https://github.com/chris-rock/node-crypto-examples

// Nodejs encryption with CTR

var algorithm = 'aes-256-ctr';

function encrypt(text, password){
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

if (process.argv[2]) {
  console.log("");
  console.log("Copy this:");
  var encrypted = encrypt(process.argv[2], process.argv[3]);
  console.log(encrypted);
  console.log("");
  console.log(decrypt(encrypted, process.argv[3]));
}
 
var secrettoken = "fe0b09971d5b485f639ef946ed9edbc483606a2853a378a4f8818b525590a2923fbec9d336045e9fa664bf72f1ee2d471cd6d350ecd039b2aebf32d2168c9650381fd97858de57890f94ac72409888051d526f0e1d853ae7311d88400b1a32f39c23fe6492caa680558c75992780e8282a1748f97127520a4d9af6f40a986ba066066129b676355be311d5445d5b81710c42830040ae34cb23f4955f95cbf126cdf1df4aee5f5b15bc401106ca407b3de132b28ccc0f02b08424f4c3fcd9e78230e6f7a27b10b191ca52fa01501aa85dbf75c43f5b4e590a61bfd633a8463d9c404d4a85ad68dcfd0bdca962a6338f7c9630fc7de9f08f26088875ca58549445cf80cb814afdab4ff3780cb339e546b65fda637d2dd36358e7c6e1978a5edf9c8116f8d5289005092d0cdcaa5f0e4149a19a2e625b1db0516e6f48f7cfed601e92fb07b090bebb4facc9ab5abd73eaffb5286eb7295ad25e7543f21824781cab5aa0ab46cb4d5928dd1029af41c6700c62736d19a627692a947020a5e9eeeb51fedbcac3256cd07c6112b3f095fa1aa4e7148756113d67c5ad3e8ea61fffa6363e53c0f820591c97bc8bb58ccfd4072c3ab1af9ae7b65062418dee28901759ceeefab7f871e7e391e04167f7e5ab30ac7a62cdd3cb59025b224df92c039e41e5fb9bca55ce99a4b6c3ab3cc139b9f4bb8966aff280943442f9ae063b9073564648425bb2dc1705200016356371f79b32328add7008bc4899b2917db14f8c9230068f278bc060c659ff149ff375da54f5924d5ceb9b7a7f5889a52cd889861475b1ac0c3f3d84600a014668665e39d0e36bf870a221dc4d838796dd129f4a39bb49d8e0cf12e296099c350e4b598f8fbf868d0ddf210deb01ddbf6d054e97e86ee4d29e5e7b1faecab579467a4174c314e93a5b6652826d5841526bddd0f1bf8f34ef72ffe43841d68fd042f264b8a8a7670c0e024f6bb2e73d82750dc9bf37f356317de123770ca5a12fef67b054b176578fd7d6330bec0e5e89daff9ba2920ce0f8422029e7b859b9cea2a6e2dddeaa193d5e89d3fa962d3d66e4ba3df742adcbb9d9a3a293918700761af66a9d77055271ca031f2f71e80bdf38467cede16ff2b49490320c315ce16c9550590884c0d185312004a1d63eedfe8385b9e0dac41e3b5614170e7fd681a8ad36cb65aa98afc8915d11852f7d715e1a6a19a023f228a1240b6a1ea98421458e5233cb226eccce84fe90b7ef521f9220bb189288e13116602e5e97e7aafce66cafc9faa895b9a92db6d44b45a5cb365b3e16351edb46bbdba21d2c9a75752d40cea9a874f9e6d2bf747780a5c6cabb1866307173b54647acaa70eb1ea2f0188de751a75126f9d3326c80d5e3f0792362d78e9699d0ae1b4c0a1b50ef25c4799895b21bc9ba5bc0f93055f537b500ad43fb335de6ce24acb58600d9130a8cf41e4a5cc799d7c8daa8b9937d8442502aff01cf02de0a4bc154e488c4b6f5518ae5125d291f8efca1df78e1c029c26b514684289cd07a1445df9f92e71a7a7defc31d6a9e372e8fc749c4a903545aab8f1ae726df84915fab437ef5c660ef27682851adae899d3c618da2c91a4fae4862d77bee840d49916a65cc6bfaf4d1a80ebee12bd04243754429ff89b87bce85304e5bf60cefae69af5ba0d3ba1dedabd93a7fa2fc967f205463a342c171aaebda3514d16a1db83108"


function changeColor(color) {
	return request({"method":"POST", "uri": "http://maker.ifttt.com/trigger/" + color + "/with/key/bLghUjKHwCSv9rqZeXdSxq"});
}

function setLight(uri, light, state) {
  return request({"method":"PUT", "uri": uri + "/lights/" + light + "/state", "json": true, body: state});
}

function getLights(uri) {
  return request({"method":"GET", "uri": uri, "json": true}).then(function(body) {
    return Object.keys(body.lights);
  });
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
			return {"colors": body.kuler.rgb.map(rgb2Hue)};
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
  var challenge = params.challenge;
  if (challenge) {
    return { "challenge": challenge };
  }
  if (params.asset && params.asset.urn) {
    return getColors(params.asset.urn, decrypt(secrettoken, params.secret)).then(function(colors) {
      return getLights(params.bridge).then(function(lights) {
        //return {"lights": lights, "bridge": params.bridge};
        var responses = lights.map(function(light, i) {
          return setLight(params.bridge, light, colors.colors[i%5]);
        });
        
        return Promise.all(responses);
      });
    });
  }
}