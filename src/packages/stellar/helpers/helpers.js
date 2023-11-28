const { Operation, Asset } = require("stellar-base")


const paymentObject = (account) => Operation.payment({
    destination: account,
    asset: new Asset(process.env.PASSET_CODE, process.env.PASSET_ISSUER),
    amount: parseFloat(process.env.PASSET_AMOUNT).toFixed(7),
    fee: "50000"
})

module.exports = {
    paymentObject
}