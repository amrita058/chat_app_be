import { NextFunction, Request, Response } from 'express'
import * as ChatServices from '../service/chat.service'

export const createChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await ChatServices.createChat(
      res.locals.userId,
      req.body.userId
    )
    res.status(201).json(response)
  } catch (e) {
    next(e)
  }
}
