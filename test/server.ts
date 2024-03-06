import path from "node:path";
import { Router, Cristalyx } from "../src/";

const PORT = 3000;

const AppServer = Cristalyx();

AppServer.listen(PORT, () => {
  console.log("Server listen on http://localhost:" + PORT);
});

const AppRouter = Router();

AppRouter.get(
  (path: string) => {
    return path === "/api/matcher";
  },
  (req, res) => {
    console.log("Executing Matcher");
    res.json({
      success: "Matcher",
    });
  }
);

AppRouter.get("/", (req, res, next) => {
  console.log("First Call");
  next();
});

AppRouter.get("/", (req, res) => {
  try {
    console.log("Second Call");

    console.log({
      url: req.url,
      method: req.method,
      body: req.body,
      contentType: req.headers["content-type"],
    });
    res.status(200);
    res.sendFile(path.resolve(path.join(__dirname, "public", "index.html")));
  } catch (error) {
    res.status(500);
    res.json({
      success: false,
    });
  }
});

AppRouter.post("/api/test", (req, res) => {
  try {
    console.log({
      url: req.url,
      method: req.method,
      body: req.body,
      contentType: req.headers["content-type"],
    });
    res.status(200);
    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500);
    res.json({
      success: false,
    });
  }
});
