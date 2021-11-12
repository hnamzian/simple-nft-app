import { Controller, Get, Param } from '@nestjs/common';
import { Web3Provider } from 'src/core/web3-provider';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly web3Provider: Web3Provider) { }

  @Get()
  async getAccounts() {
    const accounts = await this.web3Provider.getAccounts();
    return { accounts };
  }

  @Get('/balance/:account')
  async getBalance(@Param('account') account: string) {
    const balance = await this.web3Provider.getEthBalance(account)
    return {
      account,
      balance
    }
  }
}
