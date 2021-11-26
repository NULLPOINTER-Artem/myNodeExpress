/*
    path: {
      all: [callbacks],
      method: [callbacks]
    }
    "all": [callbacks] // this is array of callbacks for every router
*/

const middleware = {
  all: [],
};

const handleRegisterMiddleware = (path, callback, method = "all") => {
  if (path) {
    if (middleware[path]) {
      if (method === "all") {
        middleware[path].all.push(callback);
      } else {
        if (middleware[path][method]) {
          middleware[path][method].push(callback);
        } else {
          middleware[path][method] = [callback];
        }
      }
    } else {
      middleware[path] = {
        all: [],
      };

      if (method === "all") {
        middleware[path].all.push(callback);
      } else {
        middleware[path][method] = [callback];
      }
    }
  } else {
    if (middleware["all"]) {
      middleware["all"].push(callback);
    }
  }

  console.log("Registered middleware");
  console.log(middleware);
};

const handlePipeOfCallbacks = (callbacks, req, res) => {
  let result = true;

  for (let callback of callbacks) {
    result = callback(req, res);

    if (!result) {
      break;
    }
  }

  return result;
};

const handleExecutionMiddleware = (path, req, res, method) => {
  let result = true;

  result = handlePipeOfCallbacks(middleware["all"], req, res);

  if (path && result && middleware[path]) {
    result = handlePipeOfCallbacks(middleware[path].all, req, res);

    if (result && middleware[path][method]) {
      result = handlePipeOfCallbacks(middleware[path][method], req, res);
    }
  }

  return result;
};

module.exports = {
  handleExecutionMiddleware,
  handleRegisterMiddleware,
};
