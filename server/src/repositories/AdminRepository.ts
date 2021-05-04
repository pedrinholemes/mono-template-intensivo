import { EntityRepository, Repository } from 'typeorm'
import { Admin } from '../entities/Admin'

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {}

export { Admin }
