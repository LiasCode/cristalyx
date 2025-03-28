import { Cristalyx } from "../../lib";

const PORT = 3000;

const server = Cristalyx();

server.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`);
});

server.get("/", async (_, res) => {
  res.json({
    Hello: "World",
  });
});
