import { Injectable, BadRequestException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { SignupDto } from "./dto/signup.dto"
import { SigninDto } from "./dto/signin.dto"
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {

 constructor(
  private prisma:PrismaService,
  private jwtService:JwtService
 ){}

 async signup(data:SignupDto){

  const user = await this.prisma.users.findUnique({
   where:{email:data.email}
  })

  if(user){
   throw new BadRequestException("Email already exists")
  }

  const hash = await bcrypt.hash(data.password,10)

  const newUser = await this.prisma.users.create({
   data:{
    name:data.name,
    email:data.email,
    password:hash,
    phone:data.phone,
    birth_day:data.birthDay,
    gender:data.gender
   }
  })

  return newUser
 }

 async signin(data:SigninDto){

  const user = await this.prisma.users.findUnique({
   where:{email:data.email}
  })

  if(!user){
   throw new BadRequestException("Email not found")
  }

  const check = await bcrypt.compare(data.password,user.password)

  if(!check){
   throw new BadRequestException("Wrong password")
  }

  const token = this.jwtService.sign({
   id:user.id,
   email:user.email
  })

  return {
   message:"Login success",
   token
  }
 }
}