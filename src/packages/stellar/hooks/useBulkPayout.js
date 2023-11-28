const { TransactionBuilder, Networks, Memo, TimeoutInfinite, Operation, Asset } = require("stellar-base")
const { useConfig } = require("../config")
const { useBumpTransaction } = require("./useBumpTransaction")

const useBulkPayout = (payments) => {
    return new Promise(async (resolve, reject) => {
        /**
         * Set config and run payout
         */
        const { client, memo, keypair } = useConfig()
        
        /**
         * Calculate fee
         */
        var fee = (payments.length*1000).toFixed(0)

        /**
         * Load distribution account
         */
        client.loadAccount(keypair.publicKey()).then(source => {
            /**
             * Build builk transaction
             */
            console.log("[StellarBot]: Building transaction")
            const builder = new TransactionBuilder(source, {
                fee, 
                networkPassphrase: Networks.PUBLIC
            })
            builder.operations = payments

            console.log("[StellarBot]: Setting transaction memo")
            builder.addMemo(Memo.text(memo))
            builder.setTimeout(TimeoutInfinite)
            

            console.log("[StellarBot]: Signing transaction")
            const transaction = builder.build()
            transaction.sign(keypair)

            console.log("[StellarBot]: Submitting transaction..")
            return client.submitTransaction(transaction)
        })
        .then(response => {
            console.log("[StellarBot]: Success!")
            return resolve(response)
        })
        .catch(async error => {
            /**
             * Handle possible gas issues when submitting 
             * transaction to chain
             */
            let transaction = await useBumpTransaction(error)
            if (!transaction) {
                console.log("[StellarBot]: Encountered errors")
                return reject(error)
            }
            return resolve(transaction)
            
        })
    })
}

module.exports = {
    useBulkPayout
}