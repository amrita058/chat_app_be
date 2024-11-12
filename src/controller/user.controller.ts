import { NextFunction, Request, Response } from 'express'
import * as UserService from '../service/user.service'

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await UserService.loginUser(req.body)
    res.status(201).json(response)
  } catch (e: any) {
    next(e)
  }
}

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await UserService.registerUser(req.body)
    res.status(201).json(response)
  } catch (e) {
    next(e)
  }
}

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(201).json(await UserService.refreshToken(req.body.refreshToken))
  } catch (e) {
    next(e)
  }
}
