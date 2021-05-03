import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

type CorsConfig = cors.CorsOptions

interface ServerConstructorProps {
  corsConfig?: CorsConfig
}

const { Router } = express

class Server {
  private app: express.Application

  constructor({ corsConfig }: ServerConstructorProps = {}) {
    this.app = express()
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    if (process.env.NODE_ENV !== 'development') {
      this.app.use(cors(corsConfig))
    }
  }

  registerRouter(router: express.Router): this {
    this.app.use(router)
    return this
  }

  registerRouterWithPath(path: string, router: express.Router): this {
    this.app.use(path, router)
    return this
  }

  getExpressApp(): Express.Application {
    return this.app
  }

  start(port: number | string): Promise<this> {
    return new Promise<this>(resolve =>
      this.app.listen(port, () => resolve(this))
    )
  }
}

export { Server, Router }
