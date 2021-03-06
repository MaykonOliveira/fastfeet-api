import { Express, Router } from 'express'

export default (app: Express): void => {
  const router = Router()

  app.use('/api', router)

  router.get('/hello', (req, res) => {
    return res.json({ message: 'hello' })
  })
}
