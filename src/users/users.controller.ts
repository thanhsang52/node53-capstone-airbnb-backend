import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('api/users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get('search')
  search(@Query('keyword') keyword: string) {
    return this.usersService.search(keyword);
  }

  @Get('search/:TenNguoiDung')
  searchUser(@Param('TenNguoiDung') TenNguoiDung: string) {
    return this.usersService.searchByName(TenNguoiDung);
  }

  @Get('pagination')
  pagination(@Query('page') page: string, @Query('pageSize') pageSize: string) {
    return this.usersService.pagination(Number(page), Number(pageSize));
  }

  @Get('phan-trang-tim-kiem')
  @ApiQuery({ name: 'pageIndex', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  paginationSearch(
    @Query('pageIndex') pageIndex?: string,
    @Query('pageSize') pageSize?: string,
    @Query('keyword') keyword?: string,
  ) {
    return this.usersService.paginationSearch(
      pageIndex ? Number(pageIndex) : undefined,
      pageSize ? Number(pageSize) : undefined,
      keyword,
    );
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }
  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(Number(id), body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }

  @Post('upload-avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    const upload = await this.cloudinaryService.uploadImage(file);

    return {
      url: upload.secure_url,
    };
  }
}
