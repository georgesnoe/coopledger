import { createServer } from "node:http";
import { toNodeHandler } from "better-auth/node";
import express from "express";
import { auth } from "@/lib/auth";

const app = express();
const server = createServer(app);

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.get("/", (_, res) => {
  res.send("Hello World!");
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
