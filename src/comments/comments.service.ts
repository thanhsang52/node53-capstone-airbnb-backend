import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.comments.findMany({
      include: {
        user: true,
        room: true,
      },
    });
  }

  async create(dto: CreateCommentDto) {
    return this.prisma.comments.create({
      data: {
        room_id: dto.maPhong,
        user_id: dto.maNguoiBinhLuan,
        ngay_binh_luan: new Date(),
        noi_dung: dto.noiDung,
        sao: dto.saoBinhLuan,
      },
    });
  }

  async update(id: number, dto: UpdateCommentDto) {
    return this.prisma.comments.update({
      where: { id },
      data: {
        noi_dung: dto.noiDung,
        sao: dto.saoBinhLuan,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.comments.delete({
      where: { id },
    });
  }

  async getByRoom(roomId: number) {
    return this.prisma.comments.findMany({
      where: {
        room_id: roomId,
      },
      include: {
        user: true,
      },
    });
  }
}
