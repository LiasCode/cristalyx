import path from "node:path";
import { Cristalyx } from "../lib";

const PORT = 3000;

const server = Cristalyx();

server.listen(PORT, () => {
  console.log("Server listen on http://localhost:" + PORT);
});

// Global Middleware
server.use(
  () => true,
  (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  }
);

server.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "test", "public", "index.html"));
});

server.get("/health", (_, res) => {
  res.json({
    ok: true,
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
  }
);
