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
  console.log(encrypt(process.argv[2], process.argv[3]));
  console.log("");
}
 
var secrettoken = "fe0b09971d5b485f639ef946ed9edbc483606a2853a378a4f8818b525590a2923fbec9d336045e9fa664bf72f1ee2d471cd6d350ecd039b2aebf32d2168c9650381fd97858de57890f94ab76428bf9051d64730e1d8530e3311d88400b1a22f39f2bdd6192caa5980e8c75992780e8282a1748f97127520a4d9af6f40aff09bc66025d3eee690853fc28d5682b1a93697a7fc92f648c28fc2cf4955f95cbf126cdf1df4aee5f5b15bc721706ca76362ae13abd8ccc0f02b08424f4c3fcd9e78230e6f7a26b3ab590f45efd034002a55daf69c4293e55031d62bfd333ab463d88404214879768dcea18dfb762a630d16b9602fc698cec8a31088c3fdd2d40d644cfa5dd814afdab4ff3780cb339e546b65fda637d2dd36358e7c6e1979a74db9dbf1affd738844a0b2d1cdcaa5f0e4149a19a2e625b1db0516e6f49f6cfcb611eace74bb3beb2b44c96c9ab5abd73eaffb5286eb7295ad25e7543f21824781cab5aa0ab46cb4d5928dd1029af41c6700c62736d19a627692a947020a5e9eeeb51fedbcac3256cd07c6112b3f095fa1aa4e7148756113d67c5ad3e8ea61fffa6363e53c0f820591c97bc8bb58ccfd4072c3ab1af9af79c1f637f9de82890135fcec0d0b7ec5fdde586f07f64f7f59130af226ac9c7f159025b3549b32c039246f1ebbdca42f092beb5ed993bc02a97f3bb9a4fbdf280943442f9ae063b9073564648425bb2dc1705200016356371f79b32328add7008bc4899b2917db14f8c9230068f278bc060c659ff149ff375da54f5924202eab5507f4ea08474cca38603749b812e3812a672173b5144655f29dbfe7be444b90bc45a9c969ad8129f674ea773d8e0cf12e296099c350e4b598f8fbf868d0ddf210deb01ddbf6d054e97e86ee4d29e5e7b1faecab579467a4174c314e93a5b6652826d5841526bddd0f1bf8f34ef72ffe43841d68fd042f264b8a8a7670c0e024f6bb2e73d82750dc9bf37f356317de123770ca5a12fef67b054b176578fd7d6330bec0e5e89daff9ba2920ce0f8422029e7b859b9cea2a6e2dddeaa193d5e89d3fa962d3d66e5b803c945adf58b95a0b2b5dc84007651f60f9571077c578314252f74eb25df72467cede578baa894902110305ff16c92475a1c8ad4ff95372004add928eef68385b9e0dac41e3b5614170e7fd681a8ad36cb65aa98afc8915d11852f7d715e1a6a19a023f228a1240b6a1ea98421458e5225c13713c6f2a0ebdea7fe0074b72a9e1caabfdc051b25016590fcaad9e40da898f5b7badf9c118bf97565adb614343033327afa4ca9f8fd5e77a9687c01218c88e341e4bb97894e7882a9d2d3b43048160d54c3471ce2c463d276adfb1aadc16496755da8ea6552acf5fcac4d156cf49ed9aaee9258290c397e8572be59aa8f8d75cd8325f7f33c7ef616b20c9b55da2570fe882caec0d925e8661ee9c33e7517fd9bd7f6c08eadd65e844d6058ce38cb3fe12837ce07a0b3dff6aa59e3e72c4f3b549099a4d377e3fe36d8186b468e05bbf45d5533d19391e72a6253defc01418e7f50eab956c18f2345658f8369f800cef38f1fb8172ec3b437ab504c051b969e87890f66ae8bc929408d596af37efd9e114cef3567fc5ae1f0deb012aec919f63c78164452a28ff867d6d4305606df3ec9b4639a61e0bbf22fff818341659de2be7a046c06905aee7d8ecc912102f44932f3073e"


function changeColor(color) {
	return request({"method":"POST", "uri": "http://maker.ifttt.com/trigger/" + color + "/with/key/bLghUjKHwCSv9rqZeXdSxq"});
}

function setLight(uri, light, state) {
  return request({"method":"PUT", "uri": uri + "lights/" + light + "/state", "json": true, body: state});
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
    return params.secret;
    /*
    return getColors(params.asset.urn, decrypt(secrettoken, params.secret)).then(function(colors) {
      //TODO: actually iterate through the colors and change the hue lamps.
      getLights(params.bridge).then(function(lights) {
        lights.map(function(light, i) {
          console.log(i % 5);
          setLight(params.bridge, light, {"on":true, "sat":254, "bri":254,"hue":Math.round(Math.random()*65000)});
        });
      });
    });
    */
  }
}