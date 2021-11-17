import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AddTreeTypeDto, GetTreeTypeDto, RemoveTreeTypeDto } from './dto/trees.dto';
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

  @Post('/tree-type')
  @ApiBody({ type: AddTreeTypeDto })
  async addTreeType(@Body() treeType: AddTreeTypeDto) {
    await this.treesProvider.addTreeType(treeType);
  }

  @Get('/tree-type/:treeTypeName')
  @ApiParam({ name: 'treeTypeName', type: 'string' })
  async getTreeType(@Param() treeType: GetTreeTypeDto) {
    return await this.treesProvider.getTreeTypeByName(treeType.treeTypeName);
  }

  @Get('/tree-type')
  async getTreeTypes() {
    return await this.treesProvider.getTreeTypes();
  }

  @Delete('/tree-type/:treeTypeName')
  @ApiParam({ name: 'treeTypeName', type: 'string' })
  async removeTreeType(@Param() treeType: RemoveTreeTypeDto) {
    return await this.treesProvider.removeTreeTypeByName(treeType.treeTypeName);
  }
}