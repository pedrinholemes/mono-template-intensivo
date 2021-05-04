import { compare, hash } from 'bcrypt'
import { BaseServices } from '../infra/Services'
import { User, UserRepository } from '../repositories/UserRepository'

export class UserServices extends BaseServices<UserRepository> {
  constructor() {
    super(UserRepository)
  }

  async create(
    data: Pick<User, 'name' | 'email' | 'password' | 'send_newsletter'>
  ): Promise<Omit<User, 'password'>> {
    const User = this.repository.create({
      ...data,
      password: await this.hashPassword(data)
    })

    await this.repository.save(User)

    return User
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
  }: Pick<User, 'email' | 'password'>): Promise<
    Pick<User, 'id' | 'name' | 'email'>
  > {
    const user = await this.repository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password']
    })

    if (!user) {
      throw new Error('User not found')
    }

    const checkPassword = await compare(password, user.password)
    if (!checkPassword) {
      throw new Error('Password is incorrect')
    }

    delete user.password

    return user
  }

  async findOneByID({ id }: Record<'id', string>): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id } })
    return user
  }
}
