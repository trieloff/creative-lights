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
 
var secrettoken = "4dbb45296419faeba8776a17819eca13e6a7760fd962d624c8f6fbdd7e7785e8a85bbd258b91cb3deee33910ab521fd205177076f45a8cf7c3fb8631f23cfe50085b43db13d360bd2ec153b31794a389de2f69a61179d92dae921e4677d80b36057e25557d1d8378b6709a735cd0a6567acbf73d20c09cbf0d4243b668db6f4e41faae211fb7d3be5ffc9852787e27126d0106aee558f118346852a37e1a17889f9aab545cec43e04b1c5c0652ef32921d582acedda18d6482508882d666fd097b7e0528844bd8c16f6ae722b8661d9c819e6eb7312c7751af689d7d09200ff897c07e7f6e21df4f29b9606822d43bcbc2dcb8674f84a3e0f167f6ae9b4a5796e9db410c3ec6f88ac9888936ef2ea96fac4dad358a1f60f399e860125d1c2320a027c2c32fa2434e4616d135d5d85c467e508502f5ff433100d2103e6815e3d92e4c227289e922bc6b41fd7e65890d7360b3963d9ebee8b5ea9cc448dad9157141d7e9e803b1d73e3136c5cefbc70ee3779e743c01c96df2731e8b93af642f06c5f46d3333a40c4cd1efaf6afee5c199e93705724ad1dc9d571cb3ec1bd01fdbc6c81b0ed4d695b7ad06c5f1f679c0423c9ce6b3f6284b8e1e5ae1ee49419c3c08c7d73d4dfd45b8b7b6135166d3ff8c7abaf8fedda6b7a9e9df541c478c4b5ab03e9349a2bba997f1baf4e5e659f2f319445b8506b6055b826ac4673f89f394083fcea3f4409bf5e67a256620abf24530e6bf96f55484eca8c6fa3a894d803f31a2b36fdb39060236dd9ccc4b230db9ca8fffb92d1e068a4788e269a59a9b72a1c309f66600d9463743787094218796e451d1b5445472c597b4a8a5d01a72c91227348d9e8829525e505f58596ca6b5907fea426695f348041f3563ab44fded6f2ab992ca125823071fd2ef48e4f8cc33b0adc0ea2c16e261fb10bd05f65850ca1f2550b377cccf79a6788b7d52166f444c83dc264efd4c8cfeef946c8224e94ded90d7efa4a18c623ace2567d1e78e25718fdc449af9248aab87371ab77c1f760cb0412187daad8a8fc46f3f3d4c4caabf16735505cbae90d2fdce2fa84af02bed0c7af3160b5370643eaeb7835b9a343762bd35de7983d55a2c51cf5537205da32f34090c6d1b3a97e0b515322151a069809dec8a716b9c5138ffc5f21fd2a8eb4a31755e5a140b42e2f477a2c4971d70159801ee38b48f6988c8c688fa7c2362a5e56208b8d80183064b023f97acda7b360041c93c2d4f90fed30a3a4cff65560f3b428957935cbd22c15a5287c57a063c4d64102450eea9744a57eeee802e0c2c84244157dfaa9795ffefabe5e760504ecac714e93007c57487d47d58309aa1f5bb99f10f368709a5aeb5fe2194ea91daa0891eec4dc25d634910069d2e2e25b518d5bc39ffbe6401ec6b62e125323c294a7a08afe24f1545ec6b35e2fc760570af58ace6ebae96c6d5c92dbdaaf9ceb7314b256257a07ec98993b56495587f529ed58f27e8f3b5b11428e84c13db7836ccf350fccbe1f37ed0bc4b77079ba710c27c7c00c578f4050605fe00650087798f796823ed64da7d5e60d6c6e6fb7ede94dfd40bc548d50e94ed7dc37d0336b12d27c37a98022ff574e2e81cd380cf42fd0be3316804b37f491ed910a650e0c13900a9a02894bc1c0dfae8fe9ec026d1c89c4873eab7faa7b9c8d85ddd395710e3829ef8e48646461b6232535ac2b5"


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
    
    l = 0.5;
    s = 0.5;
    
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
      return getLights("http://100.96.36.80:8080").then(function(lights) {
        var responses = lights.map(function(light, i) {
          return setLight("http://100.96.36.80:8080", light, colors.colors[i%5]);
        });        
        return Promise.all(responses);
      });
    });
  }
}