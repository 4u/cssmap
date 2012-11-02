var format = function(map, format) {
  if (format == 'CLOSURE_UNCOMPILED') {
    return closureUncompiled(map);
  } else if (format == 'JSON') {
    return json(map);
  }

  return closureCompiled(map);
};

var closureCompiled = function(map) {
  return 'goog.setCssNameMapping(' +
    JSON.stringify(map, null, 2) +
  ');\n';
};

var closureUncompiled = function(map) {
  return 'CLOSURE_CSS_NAME_MAPPING = ' +
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
