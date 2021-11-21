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

  new Promise((resolve, reject) => {
    try {
      handleExecutionMiddleware("", req, res);
      handleExecutionMiddleware(url, req, res);

      resolve();
    } catch (err) {
      reject(err);
    }
  })
    .then(() => {
      router[url][method](req, res);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  handleRegisterRouter,
  handleRequestRouter,
};
