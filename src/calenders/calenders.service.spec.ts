import { Test, TestingModule } from '@nestjs/testing';
import { CalendersService } from './calenders.service';

describe('CalendersService', () => {
  let service: CalendersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalendersService],
    }).compile();

    service = module.get<CalendersService>(CalendersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
