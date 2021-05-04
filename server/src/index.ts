import 'dotenv/config'
import 'reflect-metadata'
import './database'
import { Server } from './infra/Server'
import { routes } from './routes'

new Server()
  .registerRouter(routes)
  .start(process.env.PORT || 3333)
  .then(() => {
    console.log('Server running')
  })
