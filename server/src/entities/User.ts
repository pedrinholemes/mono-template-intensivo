import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column({ select: false })
  password: string

  @Column()
  send_newsletter: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor() {
    if (!this.id) this.id = uuid()
    if (!this.send_newsletter) this.send_newsletter = true
  }
}
