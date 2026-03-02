import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty()
  @IsString()
  noiDung: string;

  @ApiProperty()
  @IsInt()
  saoBinhLuan: number;
}
