import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt } from 'class-validator';

export class UpdateBookingDto {
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
