import { Module } from '@nestjs/common';
import { Web3Provider } from './web3-provider';

@Module({
  imports: [],
  providers: [
    Web3Provider
  ],
  exports: [
    Web3Provider
  ]
})
export class CoreModule { }
