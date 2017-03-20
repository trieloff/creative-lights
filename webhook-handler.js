var request = require('request-promise');
var crypto = require('crypto');
var api_key = "8d06fe64c9ea43b4a41adf9348dec9ae"

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
}
 
var secrettoken = "4dbb45296419faeba8776a17819eca13e6a7760fd962d624c8f6fbdd7e7785e8a85bbd258b91cb3deee33910ab521fd205177076f45a8cf7c3fb8631f23cfe50085b43db13d360bd2ec152b73b938892cc196ea61179d92dae921e4677d80b363b7e25557d1d9f7bd3709a735cd0a6567acbf73d20c09cbf0d4243b66bc46c547bdca22478a4e8be5fdaaa6154620925570d02abdd09d819354e52a37e1a17889f9aab545cec43e04c2d041252f779857b4f38cedda18d6482508882d666fd097b7e0528844b9fc24154a422b8541a9fbfbc6eb71f287250916fc17d51340fec94f1227c4421df591790726822db67c8a7c0b8701787fee1cc68aeaea55d0b81eecc1b0c3ec6f88ac9888936ef2ea96fac4dad358a1f60f399e860125d1c64238e1981c32f90444d6802d135d5d85c467e508502f5ff433100d2103e6805a8d83e442273b7ed66be7b41fd7e65890d7360b3963d9ebee8b5ea9cc448dad9157141d7e9e803b1d73e3136c5cefbc70ee3779e743c01c96df2731e8b93af642f06c5f46d3333a40c4cd1efaf6afee5c199e93705724ad1dc9d571cb3ec1bd01fdbc6c81b0ed4d695b7ad06c5f1f679c0423c9ce6b3f6284b8e1e5ae1ee49419c3c08c7d73d4dfd45b8b7b6135166d3ff8c7abaf8fedda6b7a9e9df541c478c4b5ab03e9349a2bba997f1baf4e5e659f2f319445b8506b6055b826ac4673f89f394083fcea3f4409bf5e67a256620abf24530e6bf96f55484eca8c6fa3a894d803f31a2b36fdb39060236dd9ccc4b230db9ca80e4ae003b5a9c47aaed7db59a9275fbdc7cea6608df42096a0470f01f9a8aca6fc1b56e4477c6b8d7b6a2d61149ca0227348d9e8829525e505f58596ca6b5907fea426695f348041f3563ab44fded6f2ab992ca125823071fd2ef48e4f8cc33b0adc0ea2c16e261fb10bd05f65850ca1f2550b377cccf79a6788b7d52166f444c83dc264efd4c8cfeef946c8224e94ded90d7efa4a18c623ace2567d1e78e25718fdc449af9248aab87371ab77c1f760cb0412187daad8a8fc46f3f3d4c4caabf16735505cbae90d2fdce2fb803f105cb0c7bcd124e5060643cad8a9f128f1a2b2aaa35df2183f84d7251cf55393715bf2f220a0f301b0097abb516322351a07d8389c18d2d6b9c7b38ffc5f21fd2a8eb4a31755e5a140b42e2f477a2c4971d70159801ee38b48f6988c8c688fa7c2362a5e56208b8d80183064b090aabfea21e112d28f4581d40bfbecd702775a26220390545a050a007ab27ec51498bd06a7e0e6677121b0fdeaa427964dcd4f94e70238c2428138ab7b1bebdfa95e5f17c7866ede800b15c31cd54a7da5c4b049cb8e9dbe2d1560b8039e584a3d90c96f8b0bcd99b04956ec340076b4742b1305d7aa23ecd9c0dd4e90e11d50d4df620363f3d485e3ffee931610dd1573786a5562766bf70daa693abafdeb8d856ccfcd8ad86650c2b345b99539dd19bab58df64511286fe9303aed9b6961b2db25021c15a36daf12ecfe5f1ee2af79c375c78dffb16e3557274b063e0276727e009226ab456b55a6118a534d12a6f6aa6c1efc742a78bc5f07acc5ac5368fd456fd5766548113748b77bb3209c95be7c320eea3fa1ca356ed497203b0400720dc3fa44fc3e54545b0801684820a29c9f5d78fc22fced0e9474bf8f99cacc5eac92bc9065d3a96d78cf7d1d84d3b3f3f334f2587b5"


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

function main(params) {
  var challenge = params.challenge;
  if (challenge) {
    return { "challenge": challenge };
  }
  if (params.asset && params.asset.urn) {
    return getColors(params.asset.urn, decrypt(secrettoken, params.secret)).then(function(colors) {
      return getLights(params.bridge).then(function(lights) {
        var responses = lights.map(function(light, i) {
          return setLight(params.bridge, light, colors.colors[i%5]);
        });        
        return Promise.all(responses);
      });
    });
  }
}