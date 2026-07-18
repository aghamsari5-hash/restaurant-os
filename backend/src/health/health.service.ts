import { Injectable } from '@nestjs/common';
import { HealthStatusResponse } from './health.interface';

@Injectable()
export class HealthService {
  private readonly startTime: number = Date.now();

  public getHealthStatus(): HealthStatusResponse {
    const uptime = Math.floor((Date.now() - this.startTime) / 1000);
    return {
      status: 'ok',
      database: 'ok',
      redis: 'ok',
      version: 'v1.0.0',
      uptime,
    };
  }
}
