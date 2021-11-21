const http = require("http");
const { handleRequestRouter } = require("./../router");
const { handleRegisterMiddleware } = require("./../middleware");
const methods = require("./../methods");

const app =
  (exports =
  module.exports =
    {
      ...methods,
    });

const handleServer = (request, response) => {
  handleRequestRouter(request, response);
};

app.use = (...args) => {
  if (args.length > 2) {
    throw Error("length of arguments must be equal one or two");
  } else if (args.length === 0) {
    throw Error("use function should have at least one argument");
  } else if (args.length === 1 && typeof args[0] !== "function") {
    throw Error(
      "If function use have at least one argument it must be an function!"
    );
  }

  if (args.length === 1) {
    handleRegisterMiddleware("", args[0]);
  } else {
    handleRegisterMiddleware(args[0], args[1]);
  }
};

app.listen = (...args) => {
  const server = http.createServer(handleServer);
  return server.listen.apply(server, args);
};
