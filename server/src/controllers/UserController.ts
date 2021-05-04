import { Auth } from '../infra/Auth'
import { BaseController, Request, Response } from '../infra/Controller'
import { UserServices } from '../services/UserServices'

export class UserController extends BaseController {
  constructor() {
    super()
    this.router.post('/', this.create)
    this.router.post('/auth', this.auth)
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const service = new UserServices()

      const user = await service.create(req.body)

      res.status(201).json({
        user
      })
    } catch (e) {
      console.error(e)
      res.status(400).json({ message: e.message })
    }
  }

  async auth(req: Request, res: Response): Promise<void> {
    try {
      const service = new UserServices()

      const user = await service.auth(req.body)

      const token = Auth.generate({ email: user.email, id: user.id })

      res.status(201).json({
        user,
        token
      })
    } catch (e) {
      console.error(e)
      res.status(400).json({ message: e.message })
    }
  }
}
