import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TreesProvider } from './trees.provider';

@Controller('trees')
@ApiTags('trees')
export class TreesController {
  constructor(private treesProvider: TreesProvider) { }

  @Get('/owner')
  async getOwner() {
    const owner = await this.treesProvider.getOwner();
    return { owner };
  }
}
