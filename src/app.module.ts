import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalendersModule } from './calenders/calenders.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CalendersModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
