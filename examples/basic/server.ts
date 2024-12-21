import http from "node:http";
import path from "node:path";
import { Cristalyx, TreeRouter } from "../../lib";
import type { RouteHandlerFunction } from "../../lib/Router";

const PORT = 3000;

const server = Cristalyx(
  http.createServer(),
  new TreeRouter<RouteHandlerFunction>(["GET", "POST"]),
);

server.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`);
});

server.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
