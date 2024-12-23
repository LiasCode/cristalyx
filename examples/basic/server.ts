import http from "node:http";
import { Cristalyx, TreeRouter } from "../../lib";

const PORT = 3000;

const server = Cristalyx(http.createServer(), new TreeRouter(["GET", "POST"]));

server.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`);
});

server.get("/", (_, res) => {
  res.json({
    Hello: "World",
  });
});
