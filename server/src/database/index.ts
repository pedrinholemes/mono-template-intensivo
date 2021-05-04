import { ConnectionOptions, createConnection } from 'typeorm'
import ormconfigJSON from '../../ormconfig.json'

createConnection(ormconfigJSON as ConnectionOptions).catch(console.error)
