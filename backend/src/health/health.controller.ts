import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthService } from './health.service';
import { HealthStatusResponse } from './health.interface';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'System Health Check' })
  @ApiResponse({
    status: 200,
    description: 'Returns health diagnostics of the platform',
  })
  public getHealth(): HealthStatusResponse {
    return this.healthService.getHealthStatus();
  }
}
