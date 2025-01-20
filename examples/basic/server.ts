import http from "node:http";
import { Cristalyx, TreeRouter } from "../../lib";

const PORT = 3000;

const server = Cristalyx(
  http.createServer(),
  new TreeRouter(["GET", "POST", "PUT", "DELETE", "PATCH"]),
);

server.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`);
});

server.get("/", async (_, res) => {
  res.json({
    Hello: "World",
  });
});
