import { resolve } from 'path'
import { AdminController } from './controllers/AdminController'
import { ClassController } from './controllers/ClassController'
import { UserController } from './controllers/UserController'
import { Router } from './infra/Server'

const routes = Router()

routes.use('/user', new UserController().router)
routes.use('/class', new ClassController().router)
routes.use('/admin', new AdminController().router)

routes.use('/', (req, res) => {
  if (req.accepts('html'))
    return res.status(404).sendFile(resolve(__dirname, 'views', '404.html'))
  else if (req.accepts('json'))
    return res.status(404).json({ message: 'Not Found' })
  else return res.status(404).send('404 - Not Found')
})

export { routes }
