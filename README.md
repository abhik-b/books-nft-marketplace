# Books NFT Marketplace


## Features 
- A platform for creating NFTs of digital books (pdf) for Authors
- A marketplace for trading those Book NFTs




## Technology Stack & Tools

- Solidity (Writing Smart Contract)
- Javascript (React & Testing)
- [Ethers](https://docs.ethers.io/v5/) (Blockchain Interaction)
- [Hardhat](https://hardhat.org/) (Development Framework)
- [IPFS](https://ipfs.io/) (Metadata storage)
- [React routers](https://v5.reactrouter.com/) (Navigational components)

## Requirements For Initial Setup
- Install [NodeJS](https://nodejs.org/en/), should work with any node version below 16.5.0
- Install [Hardhat](https://hardhat.org/)

## Setting Up

### - Boot up local development blockchain
```
$ cd nft_marketplace
$ npx hardhat node
```

### - Connect development blockchain accounts to Metamask
- Copy private key of the addresses and import to Metamask
- Connect your metamask to hardhat blockchain, network `127.0.0.1:8545`.
- If you have not added hardhat to the list of networks on your metamask, open up a browser, click the fox icon, then click the top center dropdown button that lists all the available networks then click add networks. A form should pop up. For the **Network Name** field enter **Hardhat**. For the **New RPC URL** field enter `http://127.0.0.1:8545`. For the chain ID enter **31337**. Then click save.  


### - Migrate Smart Contracts
```
npx hardhat run src/backend/scripts/deploy.js --network localhost
```

### - Launch Frontend
```
$ npm run start
```
----
License : MIT

