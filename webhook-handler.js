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
 
var secrettoken = "4dbb45296419faeba8776a17819eca13e6a7760fd962d624c8f6fbdd7e7785e8a85bbd258b91cb3deee33910ab521fd205177076f45a8cf7c3fb8631f23cfe50085b43db13d360bd2ec152b714f48f91cd056ba61179d92dae921e4677d80b363b7625557d1d827cc3709a735cd0a6567acbf73d20c09cbf0d4243b66ed40778268092386bbbdf864ee4a555547e1823477e23a9d96ae526686852a37e1a17889f9aab545cec43e04c0c5b117fef31920d4338cedda18d6482508882d666fd097b7e05289461ddc17f4ca920865c1a9cbf8e6ea32224754591789b69512c0ff8aaf2337e4421df4e3a9b626822d839dca7d4b870718ffff5e16fb8ada6465195f9c81d0c3ec6f88ac9888936ef2ea96fac4dad358a1f60f399e860124d362620b0018cc11198444d5628d135d5d85c467e508502f5ff433100d2103e6809e3d93e766c7299ed21bf6b41fd7e65890d7360b3963d9ebee8b5ea9cc448dad9157141d7e9e803b1d73e3136c5cefbc70ee3779e743c01c96df2731e8b93af642f06c5f46d3333a40c4cd1efaf6afee5c199e93705724ad1dc9d571cb3ec1bd01fdbc6c81b0ed4d695b7ad06c5f1f679c0423c9ce6b3f6284b8e1e5ae1ee49419c3c08c7d73d4dfd45b8b7b6135166d3ff8c7abaf8fedda6b7a9e9df541c478c4b5ab03e9349a2bba997f1baf4e5e659f2f319445b8506b6055b826ac4673f89f394083fcea3f4409bf5e67a256620abf24530e6bf96f55484eca8c6fa3a894d803f31a2b36fdb39060236dd9ccc4b230db9ca80e4b948015e9c6987f669b585ea6d9fe270eb760cc75e36720273f13ee696e670abae474310c586edbabed71948cd1227348d9e8829525e505f58596ca6b5907fea426695f348041f3563ab44fded6f2ab992ca125823071fd2ef48e4f8cc33b0adc0ea2c16e261fb10bd05f65850ca1f2550b377cccf79a6788b7d52166f444c83dc264efd4c8cfeef946c8224e94ded90d7efa4a18c623ace2567d1e78e25718fdc449af9248aab87371ab77c1f760cb0412187daad8a8fc46f3f3d4c4caabf16735505cbae90d2fccc3f924bf22bc7427ae31243525a6431b98abd5a9a0a372bbd35df2696d5417251cf562d232bbf2f22093a6a1b0096f5a1063930518a618089fc91297f9c5d38ffc5f21fd2a8eb4a31755e5a140b42e2f477a2c4971d70159801ee38b48f6988c8c688fa7c2362a5e56208b8d80183064b1926b5bfc461090249c316364b979fd6582668a224510b775f8a6d85699e56ed0c51a6d74c7c1f1d15133500f4a44d6557da8be43e0e2882791540ab8b8f92c8f696de92485b1d9fdc1eb7562ae95687fa67660dde91ceee91e46e39f649bd8a98e0178cc1e9aa94940b8a6a98425a585f0ea905584a9425d7b23ccf8e6327d50252da55383e35506e2cecd733141ca86d31a49249195e992cc2e18bcd95ec89f239cca3d5b3a63d1038766ffb51ce889d9744f9597d5b94c9b73eb382b2b80e17813269d54811f18a52c0e7daf579e2a27d7b5d82a050a35c7772cb6cb1250363ec1202729b7bac584221e0018710797da9b0a9f042bd90c8db0ce741c01f8ad955fe77782a9b1839df41b3632bae60e3f77ec899ee168e50ec30343f9a225658d357b031d6e01d5df58c3ab2ff2750beeefcacf531d2d7876c52c0a2c7dcc5f78227e11d752283fe978ceb84377b396a3552579f83"


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