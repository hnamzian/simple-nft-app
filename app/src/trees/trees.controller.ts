import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AddTreeTypeDto, ApprovalDto, GetTreeTypeDto, PurchaseTreeDto, RemoveTreeTypeDto, TransferDto } from './dto/trees.dto';
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


  @Post('/:account')
  @ApiBody({ type: PurchaseTreeDto })
  @ApiParam({ name: 'account', type: 'string' })
  async purchaseTree(@Body() tree: PurchaseTreeDto, @Param('account') account: string) {
    await this.treesProvider.purchaseTree(tree, account);
  }

  @Get('/:account')
  @ApiParam({ name: 'account', type: 'string' })
  async getTreesOf(@Param('account') account: string) {
    return await this.treesProvider.getTreesOf(account);
  }

  @Get('approve/:treeId')
  @ApiParam({ name: 'treeId', type: 'string' })
  async getApproval(@Param('treeId') treeId: string) {
    const approved = await this.treesProvider.getApproval(treeId);

    return {
      treeId,
      approved,
    }
  }

  @Post('approve/:treeId')
  @ApiBody({ type: ApprovalDto })
  @ApiParam({ name: 'treeId', type: 'string' })
  async approveTree(@Body() approval: ApprovalDto, @Param('treeId') treeId: string) {
    await this.treesProvider.approveTree(approval, treeId);
  }

  @Post('transfer/:sender')
  @ApiBody({ type: TransferDto })
  @ApiParam({ name: 'sender', type: 'string' })
  async transferTree(@Body() transfer: TransferDto, @Param('sender') sender: string) {
    await this.treesProvider.transfer(transfer, sender);
  }
}
