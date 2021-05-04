import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('classes')
export class Class {
  @PrimaryColumn()
  id: string

  @Column()
  slug: string

  @Column()
  number: number

  @Column()
  title: string

  @Column()
  content: string

  @Column()
  youtube_video_id: string

  @Column()
  show: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor() {
    if (!this.id) this.id = uuid()
  }
}
