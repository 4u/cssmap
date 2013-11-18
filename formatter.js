var ejs = require('ejs');
var fs = require('fs');

var format = function(map, format, opt_style) {
  var style = opt_style || 'BY_PART';
  if (format == 'CLOSURE_UNCOMPILED') {
    return closureUncompiled(map, style);
  } else if (format == 'CLOSURE_COMPILED') {
    return closureCompiled(map, style);
  } else if (format == 'JSON') {
    return json(map);
  } else {
    return template(map, style, format);
  }

  return closureCompiled(map);
};

var template = function(map, style, path) {
  var filedata = fs.readFileSync(path);
  if (filedata) {
    return ejs.render(new String(filedata), {
      map: map,
      style: style
    });
  }
  throw Error('Bad file path: ' + path);
};

var closureCompiled = function(map, style) {
  return 'goog.setCssNameMapping(' +
    JSON.stringify(map, null, 2) + ', \'' + style +
  '\');\n';
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
