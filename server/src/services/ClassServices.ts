import { BaseServices } from '../infra/Services'
import { Class, ClassRepository } from '../repositories/ClassRepository'

export class ClassServices extends BaseServices<ClassRepository> {
  constructor() {
    super(ClassRepository)
  }

  async create(
    data: Pick<
      Class,
      'number' | 'content' | 'show' | 'slug' | 'title' | 'youtube_video_id'
    >
  ): Promise<Class> {
    if (!('number' in data)) throw new Error('Missing `number`')
    if (!('content' in data)) throw new Error('Missing `content`')
    if (!('show' in data)) throw new Error('Missing `show`')
    if (!('slug' in data)) throw new Error('Missing `slug`')
    if (!('title' in data)) throw new Error('Missing `title`')
    if (!('youtube_video_id' in data))
      throw new Error('Missing `youtube_video_id`')

    const Class = this.repository.create(data)

    await this.repository.save(Class)

    return Class
  }

  async list(): Promise<Class[]> {
    return await this.repository.find({ where: { show: true } })
  }

  async listAll(): Promise<Class[]> {
    return await this.repository.find()
  }
}
