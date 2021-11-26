const { handleRegisterRouter } = require("./../router");
const { handleRegisterMiddleware } = require("./../middleware");

const method = {
  get: "GET",
  post: "POST",
  put: "PUT",
  patch: "PATCH",
  delete: "DELETE",
};

const defaultOperationsForEveryMethods = (
  path,
  method,
  callback,
  middleware
) => {
  if (middleware.length > 0) {
    middleware.forEach((ware) => {
      handleRegisterMiddleware(path, ware, method);
    });
  }

  handleRegisterRouter(path, method, callback);
};

const get = (path, callback, ...middleware) => {
  defaultOperationsForEveryMethods(path, method.get, callback, middleware);
};

const post = (path, callback, ...middleware) => {
  defaultOperationsForEveryMethods(path, method.post, callback, middleware);
};

const put = (path, callback, ...middleware) => {
  defaultOperationsForEveryMethods(path, method.put, callback, middleware);
};

const patch = (path, callback, ...middleware) => {
  defaultOperationsForEveryMethods(path, method.patch, callback, middleware);
};

const del = (path, callback, ...middleware) => {
  defaultOperationsForEveryMethods(path, method.delete, callback, middleware);
};

module.exports = {
  get,
  post,
  put,
  patch,
  delete: del,
};
