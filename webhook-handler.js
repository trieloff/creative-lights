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
 
var secrettoken = "4dbb45296419faeba8776a17819eca13e6a7760fd962d624c8f6fbdd7e7785e8a85bbd258b91cb3deee33910ab521fd205177076f45a8cf7c3fb8631f23cfe50085b43db13d360bd2ec157b070878a89de2f69a61179d329ae921e4677d80b36387e16507d1d9f67b6709a735cd0a6567acbf73d20c09cbf0d4243b669c80e7841e6b23a1c81afb665f0985454755b11445c29a6e501d9330f4e52a37e1a17889f9aab545cec43e04b005a1251ef30861d533acedda18d6482508882d666fd097b7e0528845b92c27f58a920a87a519dbfb86eb721012e46bf64996951240fecaad4317f4421df4d1794716822d83adcefccb866629ff9f6e17bf2ae8b465281eec81a0c3ec6f88ac9888936ef2ea96fac4dad358a1f60f399e860125d0c6923b0158cc13fbe0f4e5624d135d5d85c467e508502f5ff433100d2103d6819abd82e766e71b7cb25bf4141fd7e65890d7360b3963d9ebee8b5ea9cc448dad9157141d7e9e803b1d73e3136c5cefbc70ee3779e743c01c96df2731e8b93af642f06c5f46d3333a40c4cd1efaf6afee5c199e93705724ad1dc9d571cb3ec1bd01fdbc6c81b0ed4d695b7ad06c5f1f679c0423c9ce6b3e612048d1e4eeeed4949993f18e9d72a5aee18b8a0ae5b5161e5ff9b53beb4fde7a6b7aa8cd4411c44ae4a598e329349a2a0f294df88f4f2be77f1e70a6a5a8506b6055b826ac4673f89f394083fcea3f4409bf5e67a256620abf24530e6bf96f55484eca8c6fa3a894d803f31a2b36fdb39060236dd9ccc4b230db9ca8ce4ae0011179f79a1f16a9f9a956db1c473ed6604c443355b7873941cad88e67bdcaf44666cc4aac3bfbdd01501d22827348d9e8829525e505f58596ca6b5907fea426695f348041f3563ab44fded6f2ab992ca125823071fd2ef48e4f8cc33b0adc0ea2c16e261fb10bd05f65850ca1f2550b377cccf79a6788b7d52166f444c83dc264efd4c8cfeef946c8224e94ded90d7efa4a18c623ace2567d1e78e25718fdc449af9248aab87371ab77c1f760cb0412187daad8a8fc46f3f3d4c4caabf16735505cbae90d2fdcd2fb402f13bc74079cd340a524a6472b9b4b9128e192873aa0fdf2797c65d7551cf5571213b8d2f22370734182a97e2a22f362152ff618189c696396ba56338ffc5f21fd2a8eb4a31755e5a140b42e2f477a2c4971d70159801ee38b48f6988c8c688fa7c2362a5e56208b8d80183064b0b1f8cfaf3411e5a0bc3023d2da7adf1715319fe1a7630687eaf77a846a672e46a4ba0f16161235f11727b01e093467e79eedacf2d7c28be393115b4a2a190cbcaebf8e7034045ffc73c927e00fa43bed75d193bc4beb9e6c4a5513cb83c89ac8cf009e8fef7b3a38d798f4bc37e7a764242f1455b748239f3a510ffa8592fc55d79c13513362b663e3be2c163171baa721b8bb8693042a17fa9a8f785adc7d6f30ecdec8fb6aa3c0b2a392b9d0fefe990a141fd7f6909b1aaee30b6f3b7a43d0aa00b2fd94301d1f068cad3d1d94a8a8f5c73679aa64da3507e0bf64db5216502fd0b1c2dba4ebf004a29a465861d6648a4e198da618e9adde855ec77ec0183c9689f487b2e811f0ed553c71331e06eff983c84bfc745b445fa00323893527d38874aa060afdf345c978e5ca5ff6e4bfef4fb81a127c1d1b74e79e0b380d3cbf9fe25cd455d15a79e99ffd38c69513e7d19647484b5"


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
    
    //l = 0.5;
    //s = 0.5;
    
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
  if (params.asset && params.asset.url) {
    return getColors(params.asset.url, decrypt(secrettoken, params.secret)).then(function(colors) {
      return getLights(params.bridge).then(function(lights) {
        var responses = lights.map(function(light, i) {
          return setLight(params.bridge, light, colors.colors[i%5]);
        });        
        return Promise.all(responses);
      });
    });
  }
}