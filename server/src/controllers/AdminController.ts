import { Auth } from '../infra/Auth'
import { BaseController, Request, Response } from '../infra/Controller'
import { AdminServices } from '../services/AdminServices'

export class AdminController extends BaseController {
  constructor() {
    super()
    this.router.post('/', this.create)
    this.router.post('/auth', this.auth)
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const service = new AdminServices()
      const adminsCount = await service.count()
      if (adminsCount > 0) {
        const authData = await Auth.middleware(req, res)
        const admin = await service.findOneByID(authData)
        if (!admin) throw new Error("You're not authenticade")
      }

      if (!('email' in req.body)) {
        throw new Error('Missing email')
      }
      if (!('name' in req.body)) {
        throw new Error('Missing name')
      }
      if (!('password' in req.body)) {
        throw new Error('Missing password')
      }

      const admin = await service.create(req.body)

      res.status(201).json({
        admin
      })
    } catch (e) {
      console.error(e)
      res.status(400).json({ message: e.message })
    }
  }

  async auth(req: Request, res: Response): Promise<void> {
    try {
      const service = new AdminServices()

      if (!('email' in req.body)) {
        throw new Error('Missing email')
      }
      if (!('password' in req.body)) {
        throw new Error('Missing password')
      }

      const admin = await service.auth(req.body)

      const token = Auth.generate({ email: admin.email, id: admin.id })

      res.status(201).json({
        admin,
        token
      })
    } catch (e) {
      console.error(e)
      res.status(400).json({ message: e.message })
    }
  }
}
