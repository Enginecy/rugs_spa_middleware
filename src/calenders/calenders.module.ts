import { Module } from '@nestjs/common';
import { CalendersService } from './calenders.service';
import { CalendersController } from './calenders.controller';

@Module({
  controllers: [CalendersController],
  providers: [CalendersService],
})
export class CalendersModule {}
