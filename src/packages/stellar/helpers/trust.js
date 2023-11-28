const { useConfig } = require("../config")

const verifyTrust = (account) => {
    return new Promise(async resolve => {
        /**
         * CLient
         */
        const { client, passet } = useConfig()

        /**
         * Account balance
         */
        let { balances } = await client.loadAccount(account)

        /**
         * Check to see if the account have a trust to the token
         */
        let trust = balances.filter(token => token.asset_code == passet.code && token.asset_issuer == passet.issuer)

        if (trust.length <= 0) {
            /**
             * No trust found
             */
            return resolve(false)
        }

        return resolve(true)
    })
}

module.exports = {
    verifyTrust
}