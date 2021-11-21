const app = require("./server");

const responseMsg = (msg, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write(msg);
  res.end();
};

app.use("/", (req, res) => {
  console.log(req.method + " " + req.url);
  return false;
});

app.get("/", (req, res) => {
  responseMsg("Hello from my custom express server", res);
});

app.get("/test", (req, res) => {
  responseMsg("this is test page on my express server", res);
});

app.delete("/", (req, res) => {
  responseMsg("deleted on my custom express server", res);
});

app.listen(2500);
