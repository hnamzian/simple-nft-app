import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigs } from './config/winston.config';
import { CoreModule } from './core/core.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    WinstonModule.forRoot(WinstonConfigs),
    CoreModule,
    AccountsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
