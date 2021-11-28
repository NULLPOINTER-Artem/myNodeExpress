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
  const splittedPath = path.split("/");
  const params = {};

  splittedPath.forEach((partOfPath, index) => {
    if (partOfPath.startsWith(":")) {
      const left = splittedPath[index - 1];
      const right = partOfPath.slice(1, partOfPath.length);

      params[left] = right;
    }
  });

  router[path] = {
    ...router[path],
    [method]: callback,
    params,
  };

  console.log("Registered routes \n", router);
};

const handleRequestRouter = (req, res, pathname, method) => {
  const resultMiddleware = handleExecutionMiddleware(
    pathname,
    req,
    res,
    method
  );

  if (resultMiddleware) {
    if (
      !router[pathname] &&
      Object.keys(router).some((path) => path.includes(":"))
    ) {
      let newPathname = "/";
      const splittedPathname_Arr = pathname.split("/");
      const splittedPathname_Obj = {};

      for (const splittedPathname_Arr_part of splittedPathname_Arr) {
        splittedPathname_Obj[splittedPathname_Arr_part] =
          splittedPathname_Arr_part;
      }

      const pathsWithParams = Object.keys(router).filter((path) =>
        path.includes(":")
      );

      pathsWithParams.forEach((path) => {
        const splittedPath = path.split("/");

        splittedPath.forEach((partOfSplittedPath, index) => {
          let endSlash = index < splittedPath.length - 1 ? "/" : "";

          if (partOfSplittedPath) {
            if (!(partOfSplittedPath in splittedPathname_Obj)) {
              const prevPart = splittedPath[index - 1];
              const pathFromRouter = router[path];

              if (prevPart in pathFromRouter.params) {
                req.params[pathFromRouter.params[prevPart]] =
                  splittedPathname_Arr[index];
                console.log("IN NEED");
                newPathname += partOfSplittedPath + endSlash;
                console.log(newPathname);
              }
            } else {
              console.log("IN NOT NEED");
              newPathname += partOfSplittedPath + endSlash;
              console.log(newPathname);
            }
          }
        });
      });

      pathname = newPathname;
    }

    console.log("pathname ", pathname);

    if (router[pathname] && router[pathname][method]) {
      router[pathname][method](req, res);
    } else {
      const errorObject = {
        status: 404,
        message: `Not Found ${pathname}`,
      };
      res.send(errorObject, 404);
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
