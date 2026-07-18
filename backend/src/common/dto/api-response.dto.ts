import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty({ example: true })
  readonly success!: boolean;

  @ApiPropertyOptional()
  readonly data?: T;

  @ApiProperty({ example: '2026-07-18T10:00:00.000Z' })
  readonly timestamp!: string;
}
