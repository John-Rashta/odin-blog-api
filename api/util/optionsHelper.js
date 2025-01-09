module.exports = (rawOptions) => {
    return {
        ...(Object.hasOwn(rawOptions, "ORDERBY") ? {orderBy: {create_date: rawOptions["ORDERBY"].toLowerCase()}} : {}),
        ...(Object.hasOwn(rawOptions, "START") ? {skip: rawOptions["START"]} : {}),
        ...(Object.hasOwn(rawOptions, "AMOUNT") ? {take: rawOptions["AMOUNT"]} : {}),
    }
};