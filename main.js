function getBotId() {
  return process.env.BOT_ID;
}
function getBotUserId() {
  return process.env.BOT_USER_ID;
}
function getPurpleGort() {
  return process.env.PURPLE_GORT;
}

var HTTPS = require('https');
var cool = require('cool-ascii-faces');
//var botID = process.env.BOT_ID;
var botID = getBotId();

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
  botRegex = /^\helix$/;

  var text = request.text;
  var textLCase = text.toLowerCase();
  var user_id = request.user_id;

  //sendText(getBotUserId());

  if (user_id == 0 || user_id == getBotUserId() || user_id == getPurpleGort()) return; // 0 is GroupMe's user id

  if (containsGort(name)) {
    sendText("No, fuck you");
    sendText("Change your nickname");
    return;
  }

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
