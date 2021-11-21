const { handleRegisterRouter } = require("./../router");
const { handleRegisterMiddleware } = require("./../middleware");

const method = {
  get: "GET",
  post: "POST",
  put: "PUT",
  patch: "PATCH",
  delete: "DELETE",
};

const get = (path, callback, ...middleware) => {
  if (middleware) {
    middleware.forEach((ware) => {
      handleRegisterMiddleware(path, ware);
    });
  }

  handleRegisterRouter(path, method.get, callback);
};

const post = (path, callback, ...middleware) => {
  if (middleware) {
    middleware.forEach((ware) => {
      handleRegisterMiddleware(path, ware);
    });
  }

  handleRegisterRouter(path, method.post, callback);
};

const put = (path, callback, ...middleware) => {
  if (middleware) {
    middleware.forEach((ware) => {
      handleRegisterMiddleware(path, ware);
    });
  }

  handleRegisterRouter(path, method.put, callback);
};

const patch = (path, callback, ...middleware) => {
  if (middleware) {
    middleware.forEach((ware) => {
      handleRegisterMiddleware(path, ware);
    });
  }

  handleRegisterRouter(path, method.patch, callback);
};

const del = (path, callback, ...middleware) => {
  if (middleware) {
    middleware.forEach((ware) => {
      handleRegisterMiddleware(path, ware);
    });
  }

  handleRegisterRouter(path, method.delete, callback);
};

module.exports = {
  get,
  post,
  put,
  patch,
  delete: del,
};
