import {
    Client,
    TransferTransaction,
    ContractInfoQuery
} from '@hashgraph/sdk';

export default {
    newTransferTransaction: async (_client: Client) => {
        const transaction = new TransferTransaction();
        transaction.setTransactionMemo("Confirm this transaction");
        await transaction.freezeWith(_client);
        await transaction.signWithOperator(_client);

        return transaction;
    },

    getContractInfo: async (_client: Client, _contracyId: string) => {
        const query = new ContractInfoQuery()
            .setContractId(_contracyId);

        return await query.execute(_client);
    }
}