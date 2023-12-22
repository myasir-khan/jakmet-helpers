module.exports = (value) => { //work for strings/numbers/arrays/objects/boolean
    if (typeof value == 'number' || typeof value == 'boolean' || value == 'true') { //if any number let it be 0 or any boolean, it will return false
        return false
    }
    else if (Array.isArray(value)) { //if its empty array it will return true
        return Boolean(value?.length)
    }
    else if (value && typeof value == 'object') { //if empty object, returns true
        return Boolean(Object.keys(value)?.length)
    }
    else { //now lets check for string
        return !value || value == undefined || value == null || value?.trim()?.toLowerCase() == 'null' || value?.trim()?.toLowerCase() == 'undefined' || value?.trim()?.toLowerCase() == 'false'

    }
}