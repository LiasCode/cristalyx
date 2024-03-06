import http from "node:http";
import { cristalyx } from "../src/cristalyx";

const PORT = 8080;

const AppServer = cristalyx();

AppServer.listen(PORT, () => {
  console.log("Server listen on http://localhost:" + PORT);
});
