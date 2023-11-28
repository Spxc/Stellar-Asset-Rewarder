const { Keypair, Server } = require("stellar-sdk")

const useConfig = () => {

    const server = new Server("https://horizon.stellar.org")
    const issuerPair = Keypair.fromSecret(process.env.KEY)
    

    const asset = {
        code: process.env.ASSET_CODE,
        issuer: process.env.ASSET_ISSUER
    }

    const passet = {
        code: process.env.PASSET_CODE,
        issuer: process.env.PASSET_ISSUER,
        amount: process.env.PASSET_AMOUNT
    }

    return {
        asset: asset,
        passet: passet,
        keypair: issuerPair,
        client: server,
        memo: process.env.PASSET_MEMO
    }
}

module.exports = { 
    useConfig
 }