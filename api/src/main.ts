import { createServer } from "node:http";
import express from "express";

const app = express();
const server = createServer(app);

app.get("/", (_, res) => {
  res.send("Hello World!");
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
