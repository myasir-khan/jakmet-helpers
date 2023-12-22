
let isNormalizedValue = (value) => {
    return Math.floor(value) == 0
}
const dataStructure = (object) => {

    let maxValue = (array, key) => {
        let highestValue = array?.sort((a, b) => b?.[key] - a?.[key])?.[0]?.[key]
        return !isNaN(highestValue) ? highestValue : array?.[0]?.[key]
    }
    let lowestValue = (array, key) => {
        let leastValue = array?.sort((a, b) => a?.[key] - b?.[key])?.[0]?.[key]
        return !isNaN(leastValue) ? leastValue : array?.[0]?.[key]
    }
    const { boundingPoly, boundingBox, key, ...rest } = object
    let description = object?.description || object?.name || object?.text
    let vertices = boundingPoly?.vertices || boundingBox?.vertices
    let normalizedVertices = boundingPoly?.normalizedVertices || boundingBox?.normalizedVertices

    let x1 = lowestValue(normalizedVertices, 'x') || lowestValue(vertices, 'x')
    let y1 = lowestValue(normalizedVertices, 'y') || lowestValue(vertices, 'y')
    let x2 = maxValue(normalizedVertices, 'x') || maxValue(vertices, 'x')
    let y2 = maxValue(normalizedVertices, 'y') || maxValue(vertices, 'y')
    let isNormalized = Boolean(isNormalizedValue(x1) && isNormalizedValue(y1) && isNormalizedValue(x2) && isNormalizedValue(y2))
    let myStructure = (
        {
            key,
            meta_data: {
                text: description,
                ...rest

            },

            rect: {
                isNormalized,
                x1, y1, x2, y2
            }
        }
    )
    if (!isNaN(x1) && !isNaN(x2) && !isNaN(y1) && !isNaN(y2)) {
        return myStructure
    } else {
        console.log("NOT FOUND ", myStructure)
        return null;
    }
}

exports.ParseData = (json) => {
    let excludeKeys = ["labelannotations"]
    let keys = Object.keys(json)
    let filteredKeys = []
    let arrayOfOBJ = keys?.map(key => {
        let data = json?.[key]
        let isExcluded = excludeKeys?.indexOf(key?.toLowerCase?.()) > -1
        if (data && Array.isArray(data) && data?.length && !isExcluded) {
            filteredKeys.push(key)
            return data?.map(obj => dataStructure({ key, ...obj }))?.filter(Boolean)
        } else {
            return null;
        }
    })?.filter(Boolean)
    return { keys: filteredKeys, data: arrayOfOBJ?.flat() }
}
