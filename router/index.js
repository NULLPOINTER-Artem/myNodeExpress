/*
router = {
    "pathNameExp=>/login": {
        "get": callback(),
        "post": callback()
    }
    "pathNameExp=>/login/:accessKey": {
        "post": callback()
    }
}
*/

const { handleExecutionMiddleware } = require("./../middleware");

const router = {};

const handleRegisterRouter = (path, method, callback) => {
  router[path] = {
    ...router[path],
    [method]: callback,
  };

  console.log("Registered routes \n", router);
};

const handleRequestRouter = (req, res) => {
  const url = req.url;
  const method = req.method;
  const resultMiddleware = handleExecutionMiddleware(url, req, res, req.method);

  if (resultMiddleware) {
    if (router[url][method]) {
      router[url][method](req, res);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found - 404");
    }
  } else {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Middleware did not pass - 400");
  }
};

module.exports = {
  handleRegisterRouter,
  handleRequestRouter,
};
