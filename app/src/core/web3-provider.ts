import { Injectable } from '@nestjs/common';
const Web3 = require('web3');
import * as config from 'config';

@Injectable()
export class Web3Provider {
  private Web3;

  constructor() {
    this.Web3 = new Web3(config.get('blockchain.url'));  
  }

  getAccounts = async () => {
    return await this.Web3.eth.getAccounts()
  }

  getEthBalance = async (account: string) => {
    return await this.Web3.eth.getBalance(account);
  }

  getContract = async (abi: any, address: string) => {
    return new this.Web3.eth.Contract(abi, address)
  }
}