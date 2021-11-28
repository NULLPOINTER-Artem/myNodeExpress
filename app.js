const app = require("./server");
const util = require("util");

const posts = [];

const responseMsg = (msg, res) => {
  const message = {
    message: msg,
  };

  res.send(message, 200);
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

app.get("/posts", (req, res) => {
  res.send(posts, 200);
});

app.get("/posts/:id", (req, res) => {
  console.log(req.params);
  console.log(req.query);
  // to realize "req.query" && "req.params"
  res.send({ message: "ok" }, 200);
});

app.post(
  "/post",
  (req, res) => {
    posts.push({ ...req.body, id: posts.length + 1 });

    res.send(
      {
        message: "OK",
      },
      200
    );
  },
  (req, res) => {
    if (req.body) {
      return true;
    }

    return false;
  },
  (req, res) => {
    if (
      app.utils.interfaceEqual(
        req.body,
        {
          author: "",
          text: "",
          date: "",
        },
        {
          checkOnDate: {
            date: "",
          },
        }
      )
    ) {
      return true;
    }

    return false;
  }
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
