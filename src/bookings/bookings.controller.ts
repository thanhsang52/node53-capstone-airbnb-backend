import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('DatPhong')
@Controller('api/dat-phong')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  getAll() {
    return this.bookingsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.bookingsService.getById(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.bookingsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBookingDto) {
    return this.bookingsService.update(Number(id), dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookingsService.delete(Number(id));
  }

  @Get('/lay-theo-nguoi-dung/:MaNguoiDung')
  getByUser(@Param('MaNguoiDung') id: string) {
    return this.bookingsService.getByUser(Number(id));
  }
}
