function getRidOfExtras(name) {
  var str = "";
  for (i = 0; i < name.length; i++) {
    if (name[i] == '0') name[i] = 'o';
    if (name[i] !== 'g' && name[i] !== 'o' && name[i] !== 'r' && name[i] !== 't') continue;
    str += name[i];
  }
  return str;
}

function containsGort(name) {
  name = name.toLowerCase();
  name = removeDiacritics(name);
  name = getRidOfExtras(name);

  var a = name.indexOf("g");
  if (a == -1) return 0;
  name = name.substr(a);

  var b = name.indexOf("o");
  if (b == -1) return 0;
  name = name.substr(b);

  var c = name.indexOf("r");
  if (c == -1) return 0;
  name = name.substr(c);

  var d = name.indexOf("t");
  if (d == -1) return 0;
  name = name.substr(d);

  return 1;
}
