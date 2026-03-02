import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchLocationDto {
  @ApiPropertyOptional()
  pageIndex?: number;

  @ApiPropertyOptional()
  pageSize?: number;

  @ApiPropertyOptional()
  keyword?: string;
}
