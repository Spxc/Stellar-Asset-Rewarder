const validateEnvironment = () => {
    const values = {
        passet_code: process.env.PASSET_CODE,
        passet_issuer: process.env.PASSET_ISSUER,
        passet_amount: process.env.PASSET_AMOUNT,
        passet_memo: process.env.PASSET_MEMO,
        asset_code: process.env.ASSET_CODE,
        asset_issuer: process.env.ASSET_ISSUER,
        key: `${process.env.KEY?.substring(0, 4)}...${process.env.KEY?.substring(40, 52)}`
    }

    let status = "All values loaded"
    let statusBool = true

    Object.keys(values).map(key => {
        if (values[key] === undefined || values[key] === "") {
            status = `${key} is missing` 
            statusBool = false
            return `${key} is missing` 
        }
    })
    return {
        status: status,
        continue: statusBool,
        values: values
    }
}

module.exports = {
    validateEnvironment
}