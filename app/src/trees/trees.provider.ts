import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Web3Provider } from 'src/core/web3-provider';
import * as config from 'config';
import { abi as treeTokenAbi } from "../../contracts/TreeToken.json";

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

}
