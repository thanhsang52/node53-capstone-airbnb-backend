import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { createPool } from 'mysql2/promise'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit
{
  constructor() {
    const connectionString = process.env.DATABASE_URL || ''
    const adapter = new PrismaMariaDb(connectionString)
    super({ adapter })
  }

  async onModuleInit() {
    await this.$connect()
  }
}