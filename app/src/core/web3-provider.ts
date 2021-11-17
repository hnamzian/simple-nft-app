import { Injectable } from '@nestjs/common';
const Web3 = require('web3');

@Injectable()
export class Web3Provider {
  private Web3;

  constructor() {
    this.Web3 = new Web3("http://localhost:8545");  
  }

  getAccounts = async () => {
    return await this.Web3.eth.getAccounts()
  }

  getEthBalance = async (account: string) => {
    return await this.Web3.eth.getBalance(account);
  }
}