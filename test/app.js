const path = require("path");
const cristalyx = require("../lib/cristalyx");
const { staticMiddleware } = require("../lib/staticMidleware");

const PORT = 8080;

const appServer = cristalyx(__dirname);

appServer.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

appServer.get("/login", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// statics in route / public
appServer.get(
  (url = "") => url.startsWith("/public"),
  staticMiddleware("public")
);

appServer.listen(PORT, () => {
  console.log("SERVER RUNNING IN PORT :  " + PORT);
});

