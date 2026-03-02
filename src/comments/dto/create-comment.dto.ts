import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsInt()
  maPhong: number;

  @ApiProperty()
  @IsInt()
  maNguoiBinhLuan: number;

  @ApiProperty()
  @IsString()
  noiDung: string;

  @ApiProperty()
  @IsInt()
  saoBinhLuan: number;
}
