import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhongThueService } from './phong-thue.service';

@Controller('api/phong-thue')
export class PhongThueController {
  constructor(private readonly phongService: PhongThueService) {}

  // GET /api/phong-thue
  @Get()
  getAllPhong() {
    return this.phongService.getAllPhong();
  }

  // GET /api/phong-thue/lay-phong-theo-vi-tri
  @Get('lay-phong-theo-vi-tri')
  getPhongTheoViTri(@Query('maViTri') maViTri: number) {
    return this.phongService.getPhongTheoViTri(maViTri);
  }

  // GET /api/phong-thue/phan-trang-tim-kiem
  @Get('phan-trang-tim-kiem')
  @ApiQuery({ name: 'pageIndex', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  searchPhong(
    @Query('pageIndex') pageIndex?: number,
    @Query('pageSize') pageSize?: number,
    @Query('keyword') keyword?: string,
  ) {
    return this.phongService.searchPhong(pageIndex, pageSize, keyword);
  }

  // GET /api/phong-thue/{id}
  @Get(':id')
  getPhongById(@Param('id') id: number) {
    return this.phongService.getPhongById(id);
  }

  // POST /api/phong-thue
  @Post()
  createPhong(@Body() body: any) {
    return this.phongService.createPhong(body);
  }

  // PUT /api/phong-thue/{id}
  @Put(':id')
  updatePhong(@Param('id') id: number, @Body() body: any) {
    return this.phongService.updatePhong(id, body);
  }

  // DELETE /api/phong-thue/{id}
  @Delete(':id')
  deletePhong(@Param('id') id: number) {
    return this.phongService.deletePhong(id);
  }

  // POST /api/phong-thue/upload-hinh-phong
  @Post('upload-hinh-phong')
  @UseInterceptors(FileInterceptor('formFile'))
  uploadHinhPhong(
    @UploadedFile() file: Express.Multer.File,
    @Query('maPhong') maPhong: number,
  ) {
    return this.phongService.uploadHinhPhong(file, maPhong);
  }
}
