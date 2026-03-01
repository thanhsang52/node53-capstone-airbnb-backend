import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { PrismaModule } from "../prisma/prisma.module"
import { JwtModule } from "@nestjs/jwt"
import { JwtStrategy } from "./strategy/jwt.strategy"
import { ConfigService } from "@nestjs/config"

@Module({
 imports:[
  PrismaModule,
  JwtModule.registerAsync({
   useFactory: (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET') || 'secret123',
    signOptions: { expiresIn: '7d' }
   }),
   inject: [ConfigService]
  })
 ],
 controllers:[AuthController],
 providers:[AuthService,JwtStrategy]
})
export class AuthModule{}