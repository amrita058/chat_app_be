import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send('Hello from message route')
})

export default router
