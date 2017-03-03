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
 
var secrettoken = "4dbb45296419faeba8776a17819eca13e6a7760fd962d624c8f6fbdd7e7785e8a85bbd258b91cb3deee33910ab521fd205177076f45a8cf7c3fb8631f23cfe50085b43db13d360bd2ec151b20798e989de1975a61179d92dae921e4677d81b363b7635557d1d9c7fed709a735cd0a6567acbf73d20c09cbf0d4243b668a3084841c0b02e4799ddbd53f8c16021623f3e475360b2e262ff2a1f4e52a37e1a17889f9aab545cec43e04c225c1341d93092237e2acedda18d6482508882d666fd097b7e0528946dd9c15158e622b87e539faf8a6eb622247652827bc47f7f380fef94d8797e5421df59399b6f6821f566cbc1d4b8671787ffe2f26fbabab65d4c83d7d0530c3ec6f88ac9888936ef2ea96fac4dad358a1f60f399e860124d3a22209e15c3c32fba0d4d780ed135d5d85c467e508502f5ff433100d2113c682fe6d83e482271a7c369bf7b41fd7e65890d7360b3963d9ebee8b5ea9cc448dad9157141d7e9e803b1d73e3136c5cefbc70ee3779e743c01c96df2731e8b93af642f06c5f46d3333a40c4cd1efaf6afee5c199e93705724ad1dc9d571cb3ec1bd01fdbc6c81b0ed4d695b7ad06c5f1f679c0423c9ce6b3f624048e3052adee59519f3f36c3d73e64e542ac9eaa125358dbff8f0ca5a1eadda6b7aab6cf541c478c4a5ab03a935eb2a0f697f1beb7e4db70e1e60a6d488506b6055b826ac4673f89f394083fcea3f4409bf5e67a256620abf24530e6bf96f55484eca8c6fa3a894d803f31a2b36fdb39060236dd9ccc4b230db9ca83bdb9101a079c7e8ff67ea59a8c708dc34fe9670cde420f581973cf259995f663f8ad6e547cdea8d8daa7e83703d12827348d9e8829525e505f58596ca6b5907fea426695f348041f3563ab44fded6f2ab992ca125823071fd2ef48e4f8cc33b0adc0ea2c16e261fb10bd05f65850ca1f2550b377cccf79a6788b7d52166f444c83dc264efd4c8cfeef946c8224e94ded90d7efa4a18c623ace2567d1e78e25718fdc449af9248aab87371ab77c1f760cb0412187daad8a8fc46f3f3d4c4caabf16735505cbae90d2fccc2fac49f13be10c79dd3c41505a643eada7975b8d342361bd35df2094d6746751cf55742015b32f340a106b1b3a97ada116362e51896edd89ef92376a9f6f38ffc5f21fd2a8eb4a31755e5a140b42e2f477a2c4971d70159801ee38b48f6988c8c688fa7c2362a5e56208b8d80183064b020aa885c8543d2d4cf21f612ca198e2480c4fa404477e314ea142aa75af21d85f4585e8195d2b60500f146fcca84d604ccb8fda1c790fd67e4e6185909cc6bbd9a1eae455666cd9e119947f1ef575b4eb1d603ce4cdb6dcc4d20c17954b81b2acd926f5bc8d998a8e3ca805ee7e56481616ba247463ed07f7a842db914e11c85d7cc0254507287a651be2c861342dd7413fabbf7c051d9d6ec4e48ba89defa6fa10c0eed4b1bf3d090a38279c79ced8e78765da145707c4e5b218b1e493b62f19851800865015e3ab4ce2c096cf4cd9ad655e5292a342f1422d2bf87ac6091b30c3717c73bb62b56f5c32e218fd7f7a7190bbb08e57c7a4e08f5eee09c13ffdc45ac4577307893d78dc7b820b1fd773e0d516da95e561af6cee3f1c229146741ce8209730e6df1e04b9a31aa1820914d2eecf81fc16f5c8f54f7bf6ac9fd1cfdafd26c80d6313a8c3bcbae19c617e196c2a556c9fa5"


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
    return {"secret": params.secret,
            "bridge": params.bridge,
            "token" : decrypt(secrettoken, params.secret)};
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