const { TransactionBuilder, Networks } = require("stellar-base");
const { useConfig } = require("../config");

const useBumpTransaction = (error) => {
    return new Promise(async (resolve, reject) => {
        const { client, keypair } = useConfig()

        if (!error.config.data) {
            reject("Invalid XDR");
        }
        const xdr = new TransactionBuilder.fromXDR(decodeURIComponent(error.config.data.split('tx=')[1]), Networks.PUBLIC);
    
        client.submitTransaction(xdr).catch(response => {
            const transaction = new TransactionBuilder.buildFeeBumpTransaction(
                keypair,
                "50000" * 10,
                xdr,
                Networks.PUBLIC
            )

            transaction.sign(keypair)

            return server.submitTransaction(transaction)
        }).then(() => {
            return resolve("Pay out successful.")
        }).catch(error => {
            return resolve(error)
        });
    })
}

module.exports = {
    useBumpTransaction
}