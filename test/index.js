const path = require("path");
const cristalyx = require("../lib/cristalyx");

const PORT = 8080;

const appServer = cristalyx();

appServer.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

appServer.get("/login", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// statics in route / public
appServer.get(
  (url = "") => url.startsWith("/public"),
  (req, res) => {
    const { url } = req;
    const plublicFolder = "public";
    let urlOfFile = path.join(process.cwd(), plublicFolder, url.split("/public")[1]);
    res.sendFile(urlOfFile);
  }
);

appServer.listen(PORT, () => {
  console.log("SERVER RUNNING IN PORT :  " + PORT);
});
