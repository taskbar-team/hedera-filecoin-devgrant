import { Transaction } from "@hashgraph/sdk";

export default {

    accountIdToEthAddress: (accountId: string, defaultAddress: string = '0000000000000000000000000000000000000000'): string | null => {
        if (!accountId)
            return null;

        //Converts accountID to accountAddress
        const accountNo = accountId.split('.')[2];
        const etherAddressRaw = parseInt(accountNo).toString(16);
        const remainingCount = 40 - etherAddressRaw.length;
        const etherAddress = defaultAddress.substr(0, remainingCount) + etherAddressRaw + defaultAddress.substr(remainingCount + etherAddressRaw.length)

        return etherAddress;
    },

    transactionToBytes: async (_transaction: Transaction) => {
        return await _transaction.toBytes();
    },

    downloadImage: (url: string, name: string) => {
        fetch(url)
            .then(resp => resp.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');

                a.style.display = 'none';
                a.href = url;
                a.download = name;

                console.log(name)

                document.body.appendChild(a);
                a.click();

                window.URL.revokeObjectURL(url);
            })
            .catch(() => alert('Cannot download the file'));
    },

    bytesToSize: (bytes: any) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

        if (bytes == 0)
            return '0 Byte';

        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());

        return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
    }
}