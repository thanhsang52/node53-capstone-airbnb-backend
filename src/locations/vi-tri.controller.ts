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
import { ViTriService } from './vi-tri.service';

@Controller('api/vi-tri')
export class ViTriController {
  constructor(private readonly viTriService: ViTriService) {}

  @Get()
  getAllViTri() {
    return this.viTriService.getAll();
  }

  @Get('phan-trang-tim-kiem')
  @ApiQuery({ name: 'pageIndex', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  search(
    @Query('pageIndex') pageIndex?: number,
    @Query('pageSize') pageSize?: number,
    @Query('keyword') keyword?: string,
  ) {
    return this.viTriService.search(pageIndex, pageSize, keyword);
  }

  @Get(':id')
  getViTriById(@Param('id') id: number) {
    return this.viTriService.getById(id);
  }

  @Post()
  createViTri(@Body() body: any) {
    return this.viTriService.create(body);
  }

  @Put(':id')
  updateViTri(@Param('id') id: number, @Body() body: any) {
    return this.viTriService.update(id, body);
  }

  @Delete(':id')
  deleteViTri(@Param('id') id: number) {
    return this.viTriService.delete(id);
  }

  @Post('upload-hinh-vitri')
  @UseInterceptors(FileInterceptor('formFile'))
  uploadHinhViTri(
    @UploadedFile() file: Express.Multer.File,
    @Query('maViTri') maViTri: number,
  ) {
    return this.viTriService.uploadHinh(file, maViTri);
  }
}
