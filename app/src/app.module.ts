import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigs } from './config/winston.config';

@Module({
  imports: [
    WinstonModule.forRoot(WinstonConfigs)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
