import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { TreesController } from './trees.controller';
import { TreesProvider } from './trees.provider';

@Module({
  imports: [CoreModule],
  controllers: [TreesController],
  providers: [TreesProvider]
})
export class TreesModule {}
