/**
 * app.js
 * 
 * Main application file, will auto run on 
 * terminal call
 * 
 * run by using the command `node app.js` or `npm start` in the app root
 */
require('dotenv').config()

const { validateEnvironment } = require('./packages/checks/env')
const { useAssetHolders } = require("./packages/stellar/hooks/useAssetHolders")
const { useBulkPayout } = require('./packages/stellar/hooks/useBulkPayout')
const { group } = require('./packages/utils')

const env = validateEnvironment()

/**
 * Validate the running environment
 */
if (!env.continue) {
    console.log("[StellarBot]: Cant load all values needed, please check your .env file")
    console.log("[StellarBot]: Loaded", env.values)
    return
}
console.log("[StellarBot]: Pre-run checks completed")

/**
 * Run the app logic
 */
useAssetHolders()
.then(async holders => {
    /**
     * Group wallets and create 
     */
    let paymentObjects = await group(holders)

    /**
     * Loop through payment object array
     * and run bulk payouts
     */
    for (let chunk in paymentObjects) {
        try {
            await useBulkPayout(paymentObjects[chunk])
        } catch (error) {
            console.log("[StellarBot]:", error)
        }
    }
})