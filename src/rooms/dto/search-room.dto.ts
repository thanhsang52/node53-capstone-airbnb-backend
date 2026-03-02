import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchRoomDto {
  @ApiPropertyOptional()
  pageIndex?: number;

  @ApiPropertyOptional()
  pageSize?: number;

  @ApiPropertyOptional()
  keyword?: string;
}
