/*
    path: [callbacks]
    "all": [callbacks] // this is array of callbacks for every router
*/

const middleware = {};

const handleRegisterMiddleware = (path, callback) => {
  if (path) {
    if (middleware[path]) {
      middleware[path].push(callback);
    } else {
      middleware[path] = [];
      middleware[path].push(callback);
    }
  } else {
    if (middleware["all"]) {
      middleware["all"].path(callback);
    } else {
      middleware["all"] = [].push(callback);
    }
  }

  console.log("Registered middleware");
  console.log(middleware);
};

const handlePipeOfCallbacks = async (callbacks, req, res) => {
  try {
    for await (const callback of callbacks) {
      try {
        await new Promise((resolve, reject) => {
          const result = callback(req, res);

          if (!result) {
            reject("Middleware did not pass");
          }

          resolve(result);
        });
      } catch (err) {
        throw Error(err);
      }
    }
  } catch (err) {
    throw Error(err);
  }
};

const handleExecutionMiddleware = (path, req, res) => {
  try {
    if (path) {
      if (middleware[path]) {
        handlePipeOfCallbacks(middleware[path], req, res);
      }
    } else {
      if (middleware["all"]) {
        handlePipeOfCallbacks(middleware["all"], req, res);
      }
    }
  } catch (err) {
    throw Error(err);
  }
};

module.exports = {
  handleExecutionMiddleware,
  handleRegisterMiddleware,
};
