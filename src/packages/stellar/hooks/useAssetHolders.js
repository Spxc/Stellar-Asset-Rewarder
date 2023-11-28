const axios = require("axios")
const { useConfig } = require("../config")

const useAssetHolders = () => {
    return new Promise(async (resolve, reject) => {
        /**
         * Fetch asset holders
         */
        const holders = await getHolders()
        
        /**
         * Nothing found aka asset is dead
         */
        if (!holders) {
            return reject("No holders found for the asset")
        }

        return resolve(holders)
    })
}

const getHolders = (next, holders = []) => {
    return new Promise(async resolve => {
        /**
         * Set timeout so we dont get kicked out of the
         * 1000ms = 1s
         * Horizon REST API
         */
        setTimeout(async () => {
            try {
                /**
                 * Set asset to look up
                 */
                const { asset } = useConfig()
                let path = `/explorer/public/asset/${asset.code}-${asset.issuer}/holders?limit=200`

                /**
                 * Check to see previous path
                 */
                if (next) {
                    path = next
                }

                /**
                 * Fetch holder data from Stellar Expert
                 */
                let { data } = await axios.get(`https://api.stellar.expert${path}`)

                /**
                 * Strip array returned, so it only contains the 
                 * account ids
                 */
                let records = data._embedded.records.map(record => record.account)

                /**
                 * Combine exisiting array with new 
                 * JSON objects
                 */
                holders.push(...records)

                /**
                 * Resolve the query if there is no more 
                 * pages or holders to fetch
                 */
                if (data._embedded.records.length == 0 ) {
                    return resolve(holders)
                }

                /**
                 * Resolve new Promise
                 */
                const cursor = await getHolders(data._links.next.href, holders)
                resolve(cursor);
            } catch (error) {
                console.log(error)
            }
        }, 1000)
    })
}

module.exports = {
    useAssetHolders
}