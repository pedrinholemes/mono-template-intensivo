import { Auth } from '../infra/Auth'
import { BaseController, Request, Response } from '../infra/Controller'
import { AdminServices } from '../services/AdminServices'
import { ClassServices } from '../services/ClassServices'
import { UserServices } from '../services/UserServices'

export class ClassController extends BaseController {
  constructor() {
    super()
    this.router.get('/', this.index)
    this.router.post('/', this.create)
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const adminData = await Auth.middleware(req, res)
      const service = new ClassServices()
      const adminService = new AdminServices()

      const admin = await adminService.findOneByID(adminData)
      if (!admin) throw new Error('Admin Not Found')

      const Class = await service.create(req.body)

      res.status(201).json({
        Class
      })
    } catch (e) {
      console.error(e)
      res.status(400).json({ message: e.message })
    }
  }

  async index(req: Request, res: Response): Promise<void> {
    try {
      const adminOrUserData = await Auth.middleware(req, res)
      const service = new ClassServices()
      const adminService = new AdminServices()
      const userService = new UserServices()

      const admin = await adminService.findOneByID(adminOrUserData)
      const user = await userService.findOneByID(adminOrUserData)

      if (admin) {
        const classes = await service.listAll()
        res.json({
          classes
        })
        return
      } else if (user) {
        const classes = await service.list()
        res.json({
          classes
        })
        return
      } else {
        throw new Error("You're not Authenticed")
      }
    } catch (e) {
      console.error(e)
      res.status(400).json({ message: e.message })
    }
  }
}
