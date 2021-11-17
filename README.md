# Simple NFT dApp
The project is a simple ERC721 dApp which tokenizes Trees. Users are able to purchase trees and will get Oxygens radiated by them.
Contract owner should add Tree Types, determining tree type name, O2 radiation rate and tree type price. Users are able to purchase trees of existing type with additional tree information; birthdate, height, diameter.

# How to run app
Docker compose files are created to build application by docker containers. Besides, using start.sh script, the whole application will be compiled, built and launched:

```
./start.sh
```

# How to stop app
To stop application simply execute stop.sh script to remove all output data and destory network.

```
./stop.sh
```

# How to test contract
First get dependencies:
```
npm i
```

Then compile contracts
```
npm run compile
```

and run tests:
```
npm run test
```

# How to use application
Whenever the application has been launched, using browser, API documentation of the app is accissible from `localhost:3000/api` using Swagger presentation.

# Steps to test application
1- The application is using ganache-cli node which provides 10 ready to use accounts. To reach addresses simple hit `/accounts` endpoint.

2- Balances of each account can be checked from `/accounts/balance/:{account}` by inserting account address.

3- Contract owner is the 0th index of accounts. To see the owner address, use `/owner` endpoint.

4- Owner is allowed to create new TreeType. From `POST: /tree-type` insert tree type params and address of owner to create new one.

5- Get params of a specified tree type from `GET: /tree-type/{treeTypeName}` by passing tree type name to request params.

6- Get all tree types from `GET: /tree-type`

7- Owner is allowed to remove a specified tree type from `DELETE: /tree-type/{treeTypeName}` by passing tree type name as request param.

8- Each user can purchase a new tree (Mint tree ERC721 token) by passing `{typeName, region, birthDate, height, diameter}` from `POST: trees/{account}`. Buyer account addres must be passed through request param.

9- Trees of each account is viewed from `GET: /trees/{account}` by passing account address to request param.

10- From `POST: /trees/approve/{treeId}` a tree owner can approve its tree to another account as spender. from and to addresses must be passed to body params.

11- To transfer an approved tree to an receiver address, spender can hit `POST: /trees/transfer/{sender}` by passing spender address to request param, and from, to, treeId params to body params.

12- Trees radiate oxygens. To claim oxygens, tree owner can use `PUT: /trees/o2/claim/{account}` and passing its address to request param.

13- To get O2 balance just use `GET: /trees/o2/{account}`

# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.js
node scripts/deploy.js
npx eslint '**/*.js'
npx eslint '**/*.js' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.template file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/deploy.js
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```
