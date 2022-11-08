// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

// ** Capitalizes String
export function capitalizeText(string: string) {
    return string[0].toUpperCase() + string.slice(1, string.length)
}