import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamps: true, versionKey: false }
)

export default mongoose.model('Chat', chatSchema)
