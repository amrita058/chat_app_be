import { env } from "../config";
import { ErrorHandler } from "../config/error.config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader ? authHeader.split(" ")[1] : null;
  if (!token) {
    // return res.status(401).json({ message: "Access denied. Token missing." });
    const error = new ErrorHandler("Access denied. Token missing.", 401);
    next(error);
  } else {
    jwt.verify(token, env.SECRET_KEY as string, (err: any, decoded: any) => {
      console.log("err", JSON.stringify(err));
      if (err)
        return res.status(403).json({ success: false, message: err.message });
      res.locals.userId = decoded;
      next(); //can directly send user as argument to next
    });
  }
};
