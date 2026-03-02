import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class PhongThueService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async getAllPhong() {
    return this.prisma.rooms.findMany({
      include: { location: true },
    });
  }

  async getPhongById(id: number) {
    return this.prisma.rooms.findUnique({
      where: { id: Number(id) },
      include: { location: true },
    });
  }

  async createPhong(data: any) {
    return this.prisma.rooms.create({
      data,
    });
  }

  async updatePhong(id: number, data: any) {
    return this.prisma.rooms.update({
      where: { id: Number(id) },
      data,
    });
  }

  async deletePhong(id: number) {
    return this.prisma.rooms.delete({
      where: { id: Number(id) },
    });
  }

  async getPhongTheoViTri(maViTri: number) {
    return this.prisma.rooms.findMany({
      where: {
        location_id: Number(maViTri),
      },
    });
  }

  async searchPhong(pageIndex = 1, pageSize = 10, keyword = '') {
    const skip = (pageIndex - 1) * pageSize;

    const data = await this.prisma.rooms.findMany({
      where: {
        ten_phong: {
          contains: keyword,
        },
      },
      skip: Number(skip),
      take: Number(pageSize),
    });

    const total = await this.prisma.rooms.count();

    return {
      pageIndex,
      pageSize,
      totalRow: total,
      data,
    };
  }

  async uploadHinhPhong(file: Express.Multer.File, maPhong: number) {
    const upload = await this.cloudinary.uploadImage(file);

    await this.prisma.rooms.update({
      where: { id: Number(maPhong) },
      data: {
        hinh_anh: upload.secure_url,
      },
    });

    return {
      message: 'Upload thành công',
      url: upload.secure_url,
    };
  }
}
