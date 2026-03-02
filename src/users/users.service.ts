import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {

 constructor(private prisma: PrismaService) {}

 async findAll() {

  return this.prisma.users.findMany({
   select:{
    id:true,
    name:true,
    email:true,
    phone:true,
    birth_day:true,
    gender:true,
    role:true,
    avatar:true
   }
  })

 }

 async findOne(id:number){

  const user = await this.prisma.users.findUnique({
   where:{id}
  })

  if(!user){
   throw new NotFoundException("User not found")
  }

  return user

 }

 async create(data:CreateUserDto){

  return this.prisma.users.create({
   data:{
    name:data.name,
    email:data.email,
    password:data.password,
    phone:data.phone,
    birth_day:data.birthday,
    gender:data.gender,
    role:data.role ?? "USER"
   }
  })

 }

 async update(id:number,data:UpdateUserDto){

  await this.findOne(id)

  return this.prisma.users.update({
   where:{id},
   data
  })

 }

 async remove(id:number){

  await this.findOne(id)

  return this.prisma.users.delete({
   where:{id}
  })

 }

 async search(keyword:string){

  return this.prisma.users.findMany({
   where:{
    name:{
     contains:keyword
    }
   }
  })

 }

 async pagination(page:number,pageSize:number){

  const skip = (page-1)*pageSize

  const data = await this.prisma.users.findMany({
   skip,
   take:pageSize
  })

  const total = await this.prisma.users.count()

  return{
   page,
   pageSize,
   total,
   data
  }

 }
async paginationSearch(
 pageIndex?: number,
 pageSize?: number,
 keyword?: string
){

 pageIndex = pageIndex || 1
 pageSize = pageSize || 10

 const skip = (pageIndex - 1) * pageSize

 const whereCondition = keyword
 ? {
    name:{
     contains: keyword
    }
   }
 : {}

 const totalRow = await this.prisma.users.count({
  where: whereCondition
 })

 const data = await this.prisma.users.findMany({
  skip,
  take: pageSize,
  where: whereCondition,
  select:{
   id:true,
   name:true,
   email:true,
   phone:true,
   birth_day:true,
   gender:true,
   role:true,
   avatar:true
  }
 })

 return{
  pageIndex,
  pageSize,
  totalRow,
  data
 }

}
 async updateAvatar(userId:number,avatarUrl:string){

  return this.prisma.users.update({
   where:{id:userId},
   data:{
    avatar:avatarUrl
   }
  })

 }
async searchByName(TenNguoiDung: string) {

 return this.prisma.users.findMany({
  where:{
   name:{
    contains: TenNguoiDung
   }
  }
 })

}
}