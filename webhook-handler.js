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
 
var secrettoken = "4dbb45296419faeba8776a17819eca13e6a7760fd962d624c8f6fbdd7e7785e8a85bbd258b91cb3deee33910ab521fd205177076f45a8cf7c3fb8631f23cfe50085b43db13d360bd2ec151b42d8b9f90de241fa61179d92dae921e4677d81b363b7635557d1d9c7fed709a735cd0a6567acbf73d20c09cbf0d4243b66ce6274f7fc4ac204081dd853afca657225b5d296a7224aad954ff2e1d6852a37e1a17889f9aab545cec43e04c08151351f825911d7660cedda18d6482508882d666fd097b7e0528946ddcc1516ae220b8661d9c819a6eb6213b2d51917fc17d09240fefbad4316b4421df4e0088756821f63ec8d1d4b8704f84a6f6db67b5bab5465083c7d7450c3ec6f88ac9888936ef2ea96fac4dad358a1f60f399e860124d3a27209e27c7c12fa2434e4602d135d5d85c467e508502f5ff433100d2103e780de6d92e58617289e922bc7b41fd7e65890d7360b3963d9ebee8b5ea9cc448dad9157141d7e9e803b1d73e3136c5cefbc70ee3779e743c01c96df2731e8b93af642f06c5f46d3333a40c4cd1efaf6afee5c199e93705724ad1dc9d571cb3ec1bd01fdbc6c81b0ed4d695b7ad06c5f1f679c0423c9ce6b3f624048e3052adee59519f3f36c3d73e64e542ac9eaa125358dbff8f0ca5a1eadda6b7aab6cf541c478c4a5ab03a935eb2a0f697f1beb7e4db70e1e60a6d488506b6055b826ac4673f89f394083fcea3f4409bf5e67a256620abf24530e6bf96f55484eca8c6fa3a894d803f31a2b36fdb39060236dd9ccc4b230db9ca80e0b83e1d169f4483f36a8f9a89758fc46fee760bb945366a0870e0258296da78a9af694063c5ccc8dfbed73b04ca0227348d9e8829525e505f58596ca6b5907fea426695f348041f3563ab44fded6f2ab992ca125823071fd2ef48e4f8cc33b0adc0ea2c16e261fb10bd05f65850ca1f2550b377cccf79a6788b7d52166f444c83dc264efd4c8cfeef946c8224e94ded90d7efa4a18c623ace2567d1e78e25718fdc449af9248aab87371ab77c1f760cb0412187daad8a8fc46f3f3d4c4caabf16735505cbae90d2fccc2f9e49f02bdf4f7af3160b5060652baea490039a1a3b2aa925de3b97e8746651cf553a37058d2f22091c6c193a97aab628353051b779ca89c196747cfa6338ffc5f21fd2a8eb4a31755e5a140b42e2f477a2c4971d70159801ee38b48f6988c8c688fa7c2362a5e56208b8d80183064b1c5d8cbdf473165e34f03a667c9af1ec4b0544810648110b519c6bc86b902fe00d4fa2d066651b646974390fd38a7f064ae0e8e6167d618d0f1b51df9caf8fdf8db88d997d395f9cac5dba791cf269b6fb525b07dfb3d5c1ebc30939f801b381a0cf2388f891a999a6189554991104561120b52e7063962bc79e11fd83112ca87d61e5194d473d6e4012d0dd7f2118fc69249893294d7dc044e4b0e8d28ce197fd37dfc8cf8ea75d37286f2b977de1f8839840c85a6b55c1f48e0aba8089806632e51976f45622df8d76cfc5d1ee54e285517f03bfe460f9534629b568d67b6113d7162077ba408f5d5d56d934e625486dbadd94866ba399dafb0cca43d51297f379c7636128e92220ef539f6b29c152f4e713e6bbfb729f48c9321212b3557026e735b152f2c34207ad8b388a88181fb1e4a784a811eaf996715bc996c5e7b1c0853be423450d87f6bebfd69f4c4d3e5252766fb293"


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