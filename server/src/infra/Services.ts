import { getCustomRepository, ObjectType, Repository } from 'typeorm'

export class BaseServices<ServiceRepository extends Repository<unknown>> {
  readonly repository: ServiceRepository
  constructor(repository: ObjectType<ServiceRepository>) {
    this.repository = getCustomRepository<ServiceRepository>(repository)
  }
}
