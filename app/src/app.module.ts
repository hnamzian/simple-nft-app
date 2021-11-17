import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigs } from './config/winston.config';
import { CoreModule } from './core/core.module';
import { AccountsModule } from './accounts/accounts.module';
import { TreesModule } from './trees/trees.module';

@Module({
  imports: [
    WinstonModule.forRoot(WinstonConfigs),
    CoreModule,
    AccountsModule,
    TreesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
