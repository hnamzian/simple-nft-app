import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Web3Provider } from 'src/core/web3-provider';
import * as config from 'config';
import { abi as treeTokenAbi } from "../../contracts/TreeToken.json";
import { AddTreeTypeDto } from './dto/trees.dto';
import { ITreeType } from './interface/trees.interface';

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
    const { name, O2Rate, price } = await this.treeContract.methods.getTreeTypeByName(treeTypeName).call();
    const treeType: ITreeType = { name, O2Rate, price };
    return treeType;
  }
}
