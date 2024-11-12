import { Router } from 'express'
import userRoutes from './user.route'
import chatRoutes from './chat.route'
import messageRoutes from './message.route'

const router = Router()

router.use('/users', userRoutes)
router.use('/chat', chatRoutes)
router.use('/message', messageRoutes)

export default router
