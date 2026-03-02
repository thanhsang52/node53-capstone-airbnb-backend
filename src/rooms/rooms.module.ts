import { Module } from '@nestjs/common';
import { PhongThueController } from './phong-thue.controller';
import { PhongThueService } from './phong-thue.service';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  controllers: [PhongThueController],
  providers: [PhongThueService, PrismaService, CloudinaryService],
})
export class RoomsModule {}
