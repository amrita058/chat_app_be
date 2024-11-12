import User from '../entities/user.entity'
import Chat from '../entities/chat.entity'

export const createChat = async (currentUserId: string, userId: string) => {
  const userInfo = await User.findOne({ _id: userId })
  if (userInfo) {
    const newChat = await Chat.create({
      members: [currentUserId, userId]
    })
    return {
      success: true,
      message: 'Chat created successfully',
      data: newChat
    }
  }
}
