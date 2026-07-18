import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return health status', () => {
    const status = controller.getHealth();
    expect(status.status).toBe('ok');
    expect(status.database).toBe('ok');
    expect(status.redis).toBe('ok');
    expect(status.version).toBe('v1.0.0');
    expect(typeof status.uptime).toBe('number');
  });
});
