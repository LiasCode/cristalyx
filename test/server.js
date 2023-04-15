const path = require("path");
const { cristalyx, staticFiles } = require("../lib");

const PORT = 8080;

const AppServer = cristalyx(__dirname);

AppServer.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

AppServer.get("/login", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// statics in route "/public"
AppServer.get((url = "") => url.startsWith("/public"), staticFiles("public"));

AppServer.listen(PORT, () => {
  console.log("SERVER RUNNING IN: " + "http://localhost:" + PORT);
});
