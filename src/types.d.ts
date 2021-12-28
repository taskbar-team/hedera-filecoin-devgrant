declare global {
  const ContractRegistry: any;
}

declare module "*.svg" {
    const content: any;
    export default content;
}

export default {}
