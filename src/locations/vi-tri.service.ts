import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ViTriService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  // GET /api/vi-tri
  async getAll() {
    const data = await this.prisma.locations.findMany();

    return {
      content: data,
      message: 'Lấy danh sách vị trí thành công',
      statusCode: 200,
      dateTime: new Date(),
    };
  }

  // GET /api/vi-tri/{id}
  async getById(id: number) {
    const data = await this.prisma.locations.findUnique({
      where: { id: Number(id) },
    });

    if (!data) {
      throw new NotFoundException('Không tìm thấy vị trí');
    }

    return {
      content: data,
      message: 'Lấy vị trí thành công',
      statusCode: 200,
      dateTime: new Date(),
    };
  }

  // POST /api/vi-tri
  async create(body: any) {
    const data = await this.prisma.locations.create({
      data: {
        ten_vi_tri: body.tenViTri,
        tinh_thanh: body.tinhThanh,
        quoc_gia: body.quocGia,
        hinh_anh: body.hinhAnh || '',
      },
    });

    return {
      content: data,
      message: 'Thêm vị trí thành công',
      statusCode: 200,
      dateTime: new Date(),
    };
  }

  // PUT /api/vi-tri/{id}
  async update(id: number, body: any) {
    const check = await this.prisma.locations.findUnique({
      where: { id: Number(id) },
    });

    if (!check) {
      throw new NotFoundException('Vị trí không tồn tại');
    }

    const data = await this.prisma.locations.update({
      where: { id: Number(id) },
      data: {
        ten_vi_tri: body.tenViTri,
        tinh_thanh: body.tinhThanh,
        quoc_gia: body.quocGia,
        hinh_anh: body.hinhAnh,
      },
    });

    return {
      content: data,
      message: 'Cập nhật vị trí thành công',
      statusCode: 200,
      dateTime: new Date(),
    };
  }

  // DELETE /api/vi-tri/{id}
  async delete(id: number) {
    const check = await this.prisma.locations.findUnique({
      where: { id: Number(id) },
    });

    if (!check) {
      throw new NotFoundException('Vị trí không tồn tại');
    }

    await this.prisma.locations.delete({
      where: { id: Number(id) },
    });

    return {
      message: 'Xóa vị trí thành công',
      statusCode: 200,
      dateTime: new Date(),
    };
  }

  // GET /api/vi-tri/phan-trang-tim-kiem
  async search(pageIndex = 1, pageSize = 10, keyword = '') {
    const skip = (pageIndex - 1) * pageSize;

    const data = await this.prisma.locations.findMany({
      where: {
        ten_vi_tri: {
          contains: keyword,
        },
      },
      skip: Number(skip),
      take: Number(pageSize),
    });

    const totalRow = await this.prisma.locations.count({
      where: {
        ten_vi_tri: {
          contains: keyword,
        },
      },
    });

    return {
      content: data,
      pageIndex: Number(pageIndex),
      pageSize: Number(pageSize),
      totalRow,
      message: 'Lấy danh sách vị trí phân trang thành công',
      statusCode: 200,
      dateTime: new Date(),
    };
  }

  // POST /api/vi-tri/upload-hinh-vitri
  async uploadHinh(file: Express.Multer.File, maViTri: number) {
    const check = await this.prisma.locations.findUnique({
      where: { id: Number(maViTri) },
    });

    if (!check) {
      throw new NotFoundException('Vị trí không tồn tại');
    }

    const uploadResult = await this.cloudinary.uploadImage(file);

    const data = await this.prisma.locations.update({
      where: { id: Number(maViTri) },
      data: {
        hinh_anh: uploadResult.secure_url,
      },
    });

    return {
      content: data,
      message: 'Upload hình vị trí thành công',
      statusCode: 200,
      dateTime: new Date(),
    };
  }
}
