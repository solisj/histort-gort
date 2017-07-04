var botID = process.env.BOT_ID;
var botUserID = process.env.BOT_USER_ID;
var purpleGort = process.env.PURPLE_GORT;

function getBotId() {
  return botID;
}
function getBotUserId() {
  return botUserID;
}
function getPurpleGort() {
  return purpleGort;
}

var HTTPS = require('https');
var cool = require('cool-ascii-faces');
//var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
  botRegex = /^\helix$/;

  var text = request.text;
  var textLCase = text.toLowerCase();
  var user_id = request.user_id;
  var name = request.name;

  //sendText(getBotUserId());

  if (user_id == 0 || user_id == getBotUserId() || user_id == getPurpleGort()) return; // 0 is GroupMe's user id

  //sendText("hi");

  /*if (containsGort(name)) {
    sendText("No, fuck you");
    sendText("Change your nickname");
    return;
  }*/

  if(request.text && text.indexOf("helix") !== -1) {
    this.res.writeHead(200);
    sendText("output");
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }

  if (request.text && textLCase.indexOf("gort show my id") == 0) { // && (user_id == "39808536") && user_id == "35415238"  { //to obtain user ID
    if(user_id == "39808536") {
       sendText("Your user ID is: -1/12");
       return;
    }
    else if (user_id == "35415238") {
	sendText("Your user ID is: 0");
        return;
  }
    else if (user_id == "32910049") {
	sendText("Your user ID is: 3.14159265358979");
        return;
  }
    else {
      sendText("Your user ID is: " + user_id)
      return;
    }
  }

  if (text == "gort show script links" && botID == "90969458e7e3fefc332bfd5321") { // to see script links in testing room
		sendText("https://github.com/solisj/histort-gort");
		sendText("Always edit the beta first! The beta version can be tested here and won't be deployed in the main group");
        return;
	}

  var baseUrl = "http://api.urbandictionary.com/v0/define?term="

  function urbanDefine(word) {
    completeUrl = baseUrl + word;
    var post = fetch(completeUrl);
    var e = post.json();
    if (e["result_type"] == "no_results") {
      return "no definition found. such sad. very disappoint";
    }
    else {
      urbanDefinition = e["list"][0]["definition"];
      return urbanDefinition;
    }
    })
  }

  if (text.substr(0,"gort define ".length) == "gort define " && text !== "gort define ") {
    var word = text.substr("gort define ".length);
    sendText(urbanDefine(word));
    return;
  }

}

function sendText(output) {
  var botResponse, options, body, botReq;

  botResponse = output;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
