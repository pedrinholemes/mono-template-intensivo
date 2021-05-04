import { compare, hash } from 'bcrypt'
import { BaseServices } from '../infra/Services'
import { Admin, AdminRepository } from '../repositories/AdminRepository'

export class AdminServices extends BaseServices<AdminRepository> {
  constructor() {
    super(AdminRepository)
  }

  async create(
    data: Pick<Admin, 'name' | 'email' | 'password'>
  ): Promise<Omit<Admin, 'password'>> {
    const Admin = this.repository.create({
      ...data,
      password: await this.hashPassword(data)
    })

    await this.repository.save(Admin)

    return Admin
  }

  async hashPassword({
    password
  }: Record<'password', string>): Promise<string> {
    const hashedPassword = await hash(password, 8)

    return hashedPassword
  }

  async auth({
    email,
    password
  }: Pick<Admin, 'email' | 'password'>): Promise<
    Pick<Admin, 'id' | 'name' | 'email'>
  > {
    const admin = await this.repository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password']
    })

    if (!admin) {
      throw new Error('Admin not found')
    }

    const checkPassword = await compare(password, admin.password)
    if (!checkPassword) {
      throw new Error('Password is incorrect')
    }

    delete admin.password

    return admin
  }

  async findOneByID({ id }: Record<'id', string>): Promise<Admin | null> {
    const admin = await this.repository.findOne({ where: { id } })
    return admin
  }

  async count(): Promise<number> {
    return await this.repository.count()
  }
}
