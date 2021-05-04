import { EntityRepository, Repository } from 'typeorm'
import { Class } from '../entities/Class'

@EntityRepository(Class)
export class ClassRepository extends Repository<Class> {}

export { Class }
