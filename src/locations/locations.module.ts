import { Module } from '@nestjs/common';
import { ViTriController } from './vi-tri.controller';
import { ViTriService } from './vi-tri.service';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  controllers: [ViTriController],
  providers: [ViTriService, PrismaService, CloudinaryService],
})
export class LocationsModule {}
