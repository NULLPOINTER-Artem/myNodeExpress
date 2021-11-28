const url = require("url");

function _Request(request) {
  for (const [key] of Object.entries(_Request.prototype)) {
    request[key] = _Request.prototype[key];
  }

  return request;
}

_Request.prototype.onDataBody = (request, response, callback) => {
  const parsedUrl = url.parse(request.url, true);

  request.query = { ...parsedUrl.query };

  request.on("data", (data) => {
    request.body += data;
  });

  request.on("end", () => {
    if (request.body) {
      request.body = JSON.parse(request.body);
    }

    callback(request, response, parsedUrl.pathname, request.method);
  });
};

_Request.prototype.body = "";

_Request.prototype.query = {};

_Request.prototype.params = {};

module.exports = _Request;
