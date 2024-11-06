import express, { Express } from "express";

import { connectDB, env } from "./config";
import {
  initialiseMiddleware,
  initializeErrorHandler,
  initializeRoutes,
} from "./config/express.config";

const app: Express = express();
const port = env.PORT || 3000;

initialiseMiddleware(app);

connectDB();

initializeRoutes(app);

initializeErrorHandler(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
