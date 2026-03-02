import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty()
  @IsInt()
  maPhong: number;

  @ApiProperty()
  @IsInt()
  maNguoiDung: number;

  @ApiProperty()
  @IsDateString()
  ngayDen: string;

  @ApiProperty()
  @IsDateString()
  ngayDi: string;

  @ApiProperty()
  @IsInt()
  soLuongKhach: number;
}
