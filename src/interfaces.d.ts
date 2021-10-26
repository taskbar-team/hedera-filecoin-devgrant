export interface WalletContextInterface {
  hex?: any
}

// export interface IHex {
//   activeAddress: string,
//   associateToken: (tokenId: string) => void,
//   burnToken: (tokenId: string, amount: number) => void,
//   chainId: string
//   createFungibleToken: (tokenName: string, tokenSymbol: string, decimal: any, initialSupply: any, options: Object) => void,
//   createNonFungibleToken: (tokenName: string, templateName: string, properties: Object) => void,
//   deleteToken: (tokenId: string) => void,
//   dissociateToken: (tokenId: string) => void,
//   enable: () => void,
//   freezeToken: (accountId: string, tokenId: string) => void,
//   getActiveAddress: () => void,
//   getNFTFile: (fileId: string) => void,
//   grantKYC: (accountId: string, tokenId: string) => void,
//   mintToken: (tokenId: string, amount: number) => void,
//   revokeKYC: (accountId: string, tokenId: string) => void,
//   sendBatch: (hbars: Array<any>, tokens: Array<any>) => void,
//   sendToken: (transfers: any) => void,
//   signMessage: (transaction: any, message: string) => void,
//   subscribe: (eventName: string, callback: any) => void,
//   subscribes: { publish: any, subscribe: any }
//   swap: (cryptoFrom: string, cryptoTo: string, amount: number) => void,
//   unFreezeToken: (accountId: string, tokenId: string) => void,
//   wipeToken: (tokenId: string, accountId: string, amount: number) => void,
// }