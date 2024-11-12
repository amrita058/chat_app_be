import Message from '../entities/message.entity'

export const createMessage = async (message: any) => {
  const newMessage = await Message.create(message)
  return {
    success: true,
    message: 'Message created successfully',
    data: newMessage
  }
}

export const getMessages = async (chatId: string) => {
  const messages = await Message.find({ chatId: chatId })
  return {
    success: true,
    message: 'Messages fetched successfully',
    data: messages
  }
}

export const deleteMessage = async (messageId: string) => {
  const message = await Message.findOne({ _id: messageId })
  if (message) {
    await Message.deleteOne({ _id: messageId })
    return {
      success: true,
      message: 'Message deleted successfully'
    }
  }
  return {
    success: false,
    message: 'Message not found'
  }
}
