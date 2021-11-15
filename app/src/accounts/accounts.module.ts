import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { AccountsController } from './accounts.controller';

@Module({
  imports: [CoreModule],
  controllers: [AccountsController]
})
export class AccountsModule { }
