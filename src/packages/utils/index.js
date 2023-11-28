const { paymentObject } = require("../stellar/helpers/helpers")
const { verifyTrust } = require("../stellar/helpers/trust")

const group = (input) => {
    return new Promise(async resolve => {
        let size = 99

        let stellarObjects = await Promise.all(input.map(account => {
            let hasTrust = verifyTrust(account)
            if (!hasTrust) {
                return
            }
            return paymentObject(account)
        }))

        const result = stellarObjects.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / size);
          
            if (!resultArray[chunkIndex]) {
              resultArray[chunkIndex] = []
            }
          
            resultArray[chunkIndex].push(item)
          
            return resultArray
        }, [])

        return resolve(result)
    })
}

module.exports = {
    group
}