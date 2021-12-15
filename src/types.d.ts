declare module "*.svg" {
    const content: any;
    export default content;
}

export type OperatorConfig = {
    accountId: string,
    privateKey: string,
}