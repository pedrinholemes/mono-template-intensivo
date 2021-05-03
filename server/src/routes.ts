import { Router } from './infra/Server'

const routes = Router()

routes.get('/', (req, res) => {
  res.json({
    ip: req.ip,
    ips: req.ips
  })
})

export { routes }
