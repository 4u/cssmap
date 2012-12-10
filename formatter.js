var ejs = require('ejs');
var fs = require('fs');

var format = function(map, format) {
  if (format == 'CLOSURE_UNCOMPILED') {
    return closureUncompiled(map);
  } else if (format == 'CLOSURE_COMPILED') {
    return closureCompiled(map);
  } else if (format == 'JSON') {
    return json(map);
  } else {
    return template(map, format);
  }

  return closureCompiled(map);
};

var template = function(map, path) {
  var filedata = fs.readFileSync(path);
  if (filedata) {
    return ejs.render(new String(filedata), {
      map: map
    });
  }
  throw Error('Bad file path: ' + path);
};

var closureCompiled = function(map) {
  return 'goog.setCssNameMapping(' +
    JSON.stringify(map, null, 2) +
  ');\n';
};

var closureUncompiled = function(map) {
  return 'var CLOSURE_CSS_NAME_MAPPING = ' +
    JSON.stringify(map, null, 2) +
  ';\n';
};

var json = function(map) {
  return JSON.stringify(map, null, 2);
};

module.exports = {
  format: format,
  json: json,
  closureCompiled: closureCompiled,
  closureUncompiled: closureUncompiled
};
