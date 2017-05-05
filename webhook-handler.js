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
 
var secrettoken = "4dbb45296419faeba8776a17819eca13e6a7760fd962d624c8f6fbdd7e7785e8a85bbd258b91cb3deee33910ab521fd205177076f45a8cf7c3fb8631f23cfe50085b43db13d360bd2ec153b23b938090e41a1ca61179d92dae921e4677d80b36057e25557d1d8378b6709a735cd0a6567acbf73d20c09cbf0d4243b66bd00c4e2484d72378b8a9b338e8885722272c2a587e11a9d866f32f104e52a37e1a17889f9aab545cec43e04c2e5a1252f33086245067cedda18d6482508882d666fd097b7e0528844bdac16f4ce023867a1b9daf8a6eb631372e468277c169413c0fefaaf5217c7e21df59398b606821fa3ac8d1c0b86661bdbdf5db7ff3bab6450f82c4d41c0c3ec6f88ac9888936ef2ea96fac4dad358a1f60f399e860125d1c2120a001c5c211be454f6824d135d5d85c467e508502f5ff433100d2103e682be3db2e502571b7d724bf7b41fd7e65890d7360b3963d9ebee8b5ea9cc448dad9157141d7e9e803b1d73e3136c5cefbc70ee3779e743c01c96df2731e8b93af642f06c5f46d3333a40c4cd1efaf6afee5c199e93705724ad1dc9d571cb3ec1bd01fdbc6c81b0ed4d695b7ad06c5f1f679c0423c9ce6b3f6284b8e1e5ae1ee49419c3c08c7d73d4dfd45b8b7b6135166d3ff8c7abaf8fedda6b7a9e9df541c478c4b5ab03e9349a2bba997f1baf4e5e659f2f319445b8506b6055b826ac4673f89f394083fcea3f4409bf5e67a256620abf24530e6bf96f55484eca8c6fa3a894d803f31a2b36fdb39060236dd9ccc4b230db9ca8ff0ba2e1e059f5480af7ea59a916da0d06ce96604ea462565787094429a89f477cbb5544b5fdecdc3b9bdf9247dd02827348d9e8829525e505f58596ca6b5907fea426695f348041f3563ab44fded6f2ab992ca125823071fd2ef48e4f8cc33b0adc0ea2c16e261fb10bd05f65850ca1f2550b377cccf79a6788b7d52166f444c83dc264efd4c8cfeef946c8224e94ded90d7efa4a18c623ace2567d1e78e25718fdc449af9248aab87371ab77c1f760cb0412187daad8a8fc46f3f3d4c4caabf16735505cbae90d2fdce2fa04af22be90b79cd280d524a6474bac293108e1a2875bc25de3b96d5422a51cf562d3428b32f220910690f1097aaa105226846a076db9ec1963a7fa26f38ffc5f21fd2a8eb4a31755e5a140b42e2f477a2c4971d70159801ee38b48f6988c8c688fa7c2362a5e56208b8d80183064b180f9ea4e863010939c03a3172f78ed16e3c43963267196b51a855af748473e14d6497f765680c6a51060267b6f4780b61d9ebdf2d690b88381712b196ef90f9edbcddd87e757fc1e807b47402ea4786d17c6f3df6d4b5ec94d46823b13fa0b286b50187bd9881bda430ad6bc07343470457fb0b6753e829dd9303e5af4478fc594be1013d073176437ce0f8301229a06831bcff4e5350b945c89aff90a3db9af008cad0dbc483371b20785d976cc6c4909052f34a365c9dd1b15e9cedb5be3171e82733f2650fc3b06cfecaebad72cea147045aa0ef4bfc767a2cf64ade050465da0c2310c44398724926fa3de6174e7090a490d1528195feca4ec75a9c509ce670e85a4f14bf3b788b71946f19d45cdd941bc9ecba63b572f030142096247d23fa549740fea20465f7be2c9f8e3350bbfcd9b8de34d2f0e1084cf0bb9fa9e3d3c233f6344508a1fb8387ce9c66780c302e2820b7b5"


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