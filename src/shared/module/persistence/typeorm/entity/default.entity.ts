import { randomUUID } from 'crypto'
import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm'

export abstract class DefaultEntity<T> {
  constructor(data: Partial<T>) {
    Object.assign(this, data)
    this.id = this.id || randomUUID()
  }

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = this.createdAt || new Date()
    this.updatedAt = new Date()
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date()
  }

  @PrimaryColumn({ type: 'uuid' })
  id: string

  @CreateDateColumn()
  createdAt: Date

  @CreateDateColumn()
  updatedAt: Date

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null
}
