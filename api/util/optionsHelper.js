module.exports = (rawOptions) => {
    return {
        ...(Object.hasOwn(rawOptions, "ORDERBY") ? {orderBy: rawOptions["ORDERBY"]} : {}),
        ...(Object.hasOwn(rawOptions, "START") ? {skip: rawOptions["START"]} : {}),
        ...(Object.hasOwn(rawOptions, "AMOUNT") ? {take: rawOptions["AMOUNT"]} : {}),
    }
}