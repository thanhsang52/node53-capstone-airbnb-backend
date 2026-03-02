import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.bookings.findMany({
      include: {
        user: true,
        room: true,
      },
    });
  }

  async getById(id: number) {
    return this.prisma.bookings.findUnique({
      where: { id },
    });
  }

  async create(dto: CreateBookingDto) {
    return this.prisma.bookings.create({
      data: {
        room_id: dto.maPhong,
        user_id: dto.maNguoiDung,
        start_date: new Date(dto.ngayDen),
        end_date: new Date(dto.ngayDi),
        so_luong_khach: dto.soLuongKhach,
      },
    });
  }

  async update(id: number, dto: UpdateBookingDto) {
    return this.prisma.bookings.update({
      where: { id },
      data: {
        start_date: new Date(dto.ngayDen),
        end_date: new Date(dto.ngayDi),
        so_luong_khach: dto.soLuongKhach,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.bookings.delete({
      where: { id },
    });
  }

  async getByUser(userId: number) {
    return this.prisma.bookings.findMany({
      where: {
        user_id: userId,
      },
      include: {
        room: true,
      },
    });
  }
}
