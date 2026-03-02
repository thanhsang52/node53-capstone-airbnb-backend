import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty()
  @IsString()
  ten_vi_tri: string;

  @ApiProperty()
  @IsString()
  tinh_thanh: string;

  @ApiProperty()
  @IsString()
  quoc_gia: string;

  @ApiProperty({ required: false })
  @IsOptional()
  hinh_anh?: string;
}
