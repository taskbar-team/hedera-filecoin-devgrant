export const validators = {
    accountId: /^[0-9]{1,9}.[0-9]{1,9}.[0-9]{1,9}$/,
    privateKey: /^[0-9a-fA-F]{96}$/,
}

export const PAYMENT_TYPES = [
    {
        type: 'hourly',
        label: "Hourly"
    },
    {
        type: 'fixed',
        label: "Fixed price"
    }
]