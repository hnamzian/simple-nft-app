import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigs } from './config/winston.config';
import { Web3Provider } from './core/web3-provider';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    WinstonModule.forRoot(WinstonConfigs),
    CoreModule
  ],
  controllers: [],
  providers: [
    Web3Provider
  ],
})
export class AppModule {}
