import { Test, TestingModule } from '@nestjs/testing';
import { CalendersController } from './calenders.controller';
import { CalendersService } from './calenders.service';

describe('CalendersController', () => {
  let controller: CalendersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalendersController],
      providers: [CalendersService],
    }).compile();

    controller = module.get<CalendersController>(CalendersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
