import express, { Express, NextFunction, Request, Response } from "express";
import routes from "../routes";
import { ErrorHandler } from "./error.config";
import { errorMiddleware } from "../middleware/error.middleware";
import cors from "cors";
import morgan from "morgan";

export const initialiseMiddleware = (app: Express) => {
  app.use(cors({ origin: "*" }));
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};

export const initializeRoutes = (app: Express) => {
  app.get("/health", (req: Request, res: Response) => {
    const timestamp = new Date().toISOString();
    res
      .status(200)
      .json({ status: true, timestamp, message: "Api is running" });
  });

  app.use("/api/v1", routes);

  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const error = new ErrorHandler("Path not found", 404);
    error.name = "Not found";
    throw error;
  });
};

export const initializeErrorHandler = (app: Express) => {
  app.use(errorMiddleware);
};
