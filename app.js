const app = require("./server");

const responseMsg = (msg, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write(msg);
  res.end();
};

const checkReqMethod = (req, res) => {
  console.log(req.url);
  console.log("checkReqMethod");
  if (req.method === "GET") {
    return true;
  }

  return false;
};

const checkUrlStarts = (req, res) => {
  console.log(req.url);
  console.log("checkUrlStarts");
  if (req.url.includes("test")) {
    return true;
  }

  return false;
};

app.use((req, res) => {
  console.log("ALLLLLLLLLLLLLLLL " + req.method + " " + req.url);
  return true;
});

app.use("/", (req, res) => {
  console.log(req.method + " " + req.url);
  return true;
});

app.get(
  "/",
  (req, res) => {
    responseMsg("Hello from my custom express server", res);
  },
  checkReqMethod,
  checkUrlStarts
);

app.get(
  "/test",
  (req, res) => {
    responseMsg("this is test page on my express server", res);
  },
  checkReqMethod,
  checkUrlStarts
);

app.delete(
  "/",
  (req, res) => {
    responseMsg("deleted on my custom express server", res);
  },
  checkReqMethod,
  checkUrlStarts
);

app.listen(2500);
