function fixText(text) {
  for (i = 0; i < text.length; i++) {
    if (text[i] == ' ') text[i] = '+';
  }
  return text;
}

function getGif(text) {
  text = fixText(text);
  var post = UrlFetchApp.fetch("http://api.giphy.com/v1/gifs/search?q=" + text + "&api_key=dc6zaTOxFJmzC");
  var e = JSON.parse(post.getContentText());
  return e["data"][random(0, 24)].images.original.url;
}

function getMeme(text) {
  var post = UrlFetchApp.fetch("https://api.imgflip.com/get_memes");
  var e = JSON.parse(post.getContentText());
  sendText(e["data"]["memes"][random(0, 99)]["url"]);
}

function kelvinToF(k) {
  return 1.8 * (k - 273) + 32;
}

function getWeather() {
  var post = UrlFetchApp.fetch("api.openweathermap.org/data/2.5/weather?zip=02139&APPID=3b6996b817db1f608f6a63140a8e77f0");
  var e = JSON.parse(post.getContentText());
  return e["weather"][0]["main"] + ", " + parseInt(kelvinToF(e["main"]["temp"])) + " °F";
}
