import express, { Express } from "express";
import { Server } from "socket.io";
import http from "http";

import { connectDB, env } from "./config";
import {
  initialiseMiddleware,
  initializeErrorHandler,
  initializeRoutes,
} from "./config/express.config";
import { initializeSocket } from "./config/socket.config";

const app: Express = express();
const port = env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

initializeSocket(io);

initialiseMiddleware(app);

connectDB();

initializeRoutes(app);

initializeErrorHandler(app);

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
