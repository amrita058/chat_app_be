import { NextFunction, Request, Response } from "express";
import * as UserService from "../service/user.service";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("at login user controller", req.body);
    res.status(201).json(await UserService.loginUser(req.body));
  } catch (e: any) {
    console.log("controller login error", e);
    next(e);
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(201).json(await UserService.registerUser(req.body));
  } catch (e) {
    next(e);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(201).json(await UserService.refreshToken(req.body.refreshToken));
  } catch (e) {
    next(e);
  }
};
