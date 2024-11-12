import { NextFunction, Request, Response } from 'express'
import * as MessageService from '../service/message.service'

export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await MessageService.createMessage(req.body)
    res.status(201).json(response)
  } catch (e) {
    next(e)
  }
}

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await MessageService.getMessages(req.params.chatId)
    res.status(201).json(response)
  } catch (e) {
    next(e)
  }
}

export const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await MessageService.deleteMessage(req.params.messageId)
    res.status(201).json(response)
  } catch (e) {
    next(e)
  }
}
