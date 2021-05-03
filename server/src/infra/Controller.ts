import { Request, Response, Router } from 'express'

export { Request, Response }

export abstract class BaseController {
  public router: Router
  constructor() {
    this.router = Router()
  }
}
