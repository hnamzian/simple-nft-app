import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Web3Provider } from 'src/core/web3-provider';
import * as config from 'config';
import { abi as treeTokenAbi } from "../../contracts/TreeToken.json";
import { AddTreeTypeDto, ApprovalDto, PurchaseTreeDto, TransferDto } from './dto/trees.dto';
import { ITree, ITreeType } from './interface/trees.interface';

@Injectable()
export class TreesProvider implements OnModuleInit {
  private treeContract = null;

  logger = new Logger(this.constructor.name);

  constructor(private readonly web3Provider: Web3Provider) { }

  async onModuleInit() {
    const treeTokenAddress = config.get('treeToken.address');

    this.treeContract = await this.web3Provider.getContract(treeTokenAbi, treeTokenAddress);
  }

  getOwner = async () => {
    return await this.treeContract.methods.owner().call();
  }

  addTreeType = async (treeType: AddTreeTypeDto) => {
    const owner = (await this.web3Provider.getAccounts())[0]
    return await this.treeContract.methods.addTreeType(
      treeType.name,
      treeType.O2Rate,
      treeType.price
    ).send({
      from: owner,
      gas: 3000000
    });
  }

  getTreeTypeByName = async (treeTypeName: string): Promise<ITreeType> => {
    // todo: handle revert message
    const { name, O2Rate, price } = await this.treeContract.methods.getTreeTypeByName(treeTypeName).call();
    const treeType: ITreeType = { name, O2Rate, price };
    return treeType;
  }

  getTreeTypes = async () => {
    const typeIds = await this.treeContract.methods.getTreeTypeIds().call();

    const treeTypes = await Promise.all(typeIds.map(async typeId => {
      const { name, O2Rate, price } = await this.treeContract.methods.getTreeTypeById(typeId).call();
      const treeType: ITreeType = { name, O2Rate, price };
      return treeType;
    }))

    return treeTypes;
  }

  removeTreeTypeByName = async (treeTypeName: string): Promise<boolean> => {
    const owner = (await this.web3Provider.getAccounts())[0]
    await this.treeContract.methods.removeTreeTypeByName(treeTypeName).send({
      from: owner,
      gas: 3000000
    });
    return true;
  }

  purchaseTree = async (tree: PurchaseTreeDto, buyer: string) => {
    const { price } = await this.treeContract.methods.getTreeTypeByName(tree.typeName).call();

    await this.treeContract.methods.purchaseTree(
      tree.typeName,
      tree.region,
      +tree.birthDate,
      +tree.height,
      +tree.diameter).send({
        from: buyer,
        value: price,
        gas: 3000000
      });
    return true;
  }

  approveTree = async (approval: ApprovalDto, treeId: string) => {
    await this.treeContract.methods.approve(approval.to, treeId).send({
      from: approval.from,
      gas: 3000000
    });
  }

  getApproval = async (treeId: string) => {
    return await this.treeContract.methods.getApproved(treeId).call();
  }

  transfer = async (transfer: TransferDto, sender: string) => {
    await this.treeContract.methods.transferFrom(transfer.from, transfer.to, transfer.treeId).send({
      from: sender,
      gas: 3000000
    });
  }

  getTreesOf = async (account: string): Promise<ITree[]> => {
    const treeIds = await this.treeContract.methods.getTreesOf(account).call();
    const trees: ITree[] = await Promise.all(treeIds.map(async treeId => {
      const { typeName,
        region,
        birthDate,
        height,
        diameter,
        transferredAt } = await this.treeContract.methods.getTreeById(treeId).call();
      return {
        treeId,
        typeName,
        region,
        birthDate,
        height,
        diameter,
        transferredAt
      } as ITree;
    }));

    return trees;
  }

  claimOxygens = async (account: string) => {
    await this.treeContract.methods.claimOxygens().send({
      from: account,
      gas: 3000000
    });
  }

  getOxygensOf = async (account: string) => {
    return await this.treeContract.methods.oxygensOf(account).call();
  }
}
