import { Types } from "mongoose"
import axios from "axios"
const getSelectData = (select = []) => {
    return Object.fromEntries(select.map((v) => [v, 1]))
}
const unGetSelectData = (select = []) => {
    return Object.fromEntries(select.map((v) => [v, 0]))
}

const removeUndefinedObject = (obj) => {
    Object.keys(obj).forEach((k) => {
        if (obj[k] == undefined || obj[k] == null) {
            delete obj[k]
        }
    })
    return obj
}
const updateNestedObjectParser = (obj) => {
    const final = {}
    Object.keys(obj).forEach((k) => {
        if (typeof obj[k] === "object" && !Array.isArray(obj[k])) {
            const res = updateNestedObjectParser(obj[k])
            Object.keys(obj[k]).forEach((a) => {
                final[`${k}.${a}`] = res[a]
            })
        } else final[k] = obj[k]
    })
    return final
}
const getIP = async function () {
    return (await axios.get("https://api64.ipify.org?format=json")).data.ip
}

export { getSelectData, unGetSelectData, removeUndefinedObject, updateNestedObjectParser, getIP }