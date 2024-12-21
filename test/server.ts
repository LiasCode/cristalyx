import path from "node:path";
import { Cristalyx, LinearRouter, TreeRouter } from "../lib";
import http from "node:http";
import type { RouteHandlerFunction } from "../lib/Router";

const PORT = 3000;

const treeRouter = new TreeRouter<RouteHandlerFunction>(["GET", "POST"]);
const linearRouter = new LinearRouter<RouteHandlerFunction>(["GET", "POST"]);

const server = Cristalyx(http.createServer(), linearRouter);

server.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`);
});

// Global Middleware
// server.use(
//   () => true,
//   (req, _res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
//   },
// );

server.get("/", (_, res) => {
  res.sendFile(path.join(process.cwd(), "test", "public", "index.html"));
});

server.get("/health", (_, res) => {
  res.json({
    ok: true,
  });
});

server.get("/api/user/id", (_, res) => {
  res.json({
    user_id: 1,
  });
});

server.post(
  "/",
  (req, _res, next) => {
    if (req.headers["content-type"] === "application/json" && req.body.length > 0) {
      req.body = JSON.parse(req.body);
    }
    next();
  },
  (req, res) => {
    console.log({ body: req.body });
    res.json({
      ok: true,
    });
  },
);

// console.log(treeRouter.toString());
