function _Response(response) {
  for (const [key] of Object.entries(_Response.prototype)) {
    response[key] = _Response.prototype[key];
  }

  return response;
}

_Response.prototype.send = function (javascriptObject, status) {
  this.writeHead(status, { "Content-Type": "application/json" });
  this.end(JSON.stringify(javascriptObject));
};

module.exports = _Response;
