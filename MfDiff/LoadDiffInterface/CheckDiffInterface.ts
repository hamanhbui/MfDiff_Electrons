import diff = require("../DiffInterface")
import single = require("../SingleInterface")

export function checkIBasicDiff(diffInterface: diff.IBasicDiff<any>): diff.IBasicDiff<any> | undefined {
    if (diffInterface.member1 && diffInterface.member1.id) {
        if (diffInterface.member2 === undefined ||
            (diffInterface.member2 !== undefined &&
                (diffInterface.member1.value !== diffInterface.member2.value || diffInterface.member1.name !== diffInterface.member2.name))) {
            diffInterface.isDiff = true;
        }
        else if (diffInterface.member2 === undefined ||
            (diffInterface.member2 !== undefined &&
                (diffInterface.member1.operation !== diffInterface.member2.operation))) {
            diffInterface.isDiff = true;
        }
        else {
            diffInterface.isDiff = false;
        }
        return diffInterface
    }
    if (diffInterface.member1 instanceof Array) {
        diffInterface.member1 = checkIArray(diffInterface.member1)
        diffInterface.member2 = checkIArray(diffInterface.member2)
        return diffInterface;
    } else {
        if (diffInterface.member1 && diffInterface.member1.typeName) {
            diffInterface.member1 = checkSingleInterface(diffInterface.member1);
        }
        if (diffInterface.member2 && diffInterface.member2.typeName) {
            diffInterface.member2 = checkSingleInterface(diffInterface.member2);
        }
    }
    diffInterface.isDiff = diffInterface.member1 !== diffInterface.member2
    return diffInterface
}

export function checkSingleInterface(singleInterface: {}): {} | undefined {
    if (singleInterface === undefined) return undefined;
    let output = false;
    for (let property in singleInterface) {
        if (singleInterface[property] instanceof Array) {
            singleInterface[property] = checkIArray(singleInterface[property]);
        }
        if (singleInterface[property] !== undefined) output = true;
    }
    if (output) {
        return singleInterface
    } else {
        return undefined
    }

}

export function checkIArray(array: Array<any>): Array<any> | undefined {
    let checkArray = false;
    let output: Array<any> = [];
    array.forEach(element => {
        if (element !== undefined) {
            checkArray = true;
            output.push(element);
        }
    })
    if (checkArray) return output;
    else return undefined;
}

export function checkIArrayDiff(arrayOfDiffs: Array<diff.IBasicDiff<any>>): { array: Array<diff.IBasicDiff<any>> | undefined, isDiff: boolean } {
    let isDiff = false;
    let tmpArray: Array<diff.IBasicDiff<any>> = []
    arrayOfDiffs.forEach(element => {
        let tmpElement = checkIBasicDiff(element);
        if (tmpElement && tmpElement.isDiff) isDiff = true;
        if (tmpElement) {
            tmpArray.push(tmpElement);
        }
    })
    arrayOfDiffs = tmpArray;
    return { array: checkIArray(arrayOfDiffs), isDiff: isDiff }
}

/**
 * check if a diffInterface contains differences and show that differences
 * @param diffInterface to check
 * @return null if there are no differences or an diff.IObject contains differences otherwise
 */
export function checkDiffInterface(diffInterface: diff.IDiff | undefined): diff.IEditElement | diff.IBasicDiff<any> | undefined {
    if (!diffInterface) return undefined;
    diffInterface.isDiff = false;
    for (let property in diffInterface) {
        if (property === 'id' || property === 'typeName' || property === 'isDiff') continue;
        if (diffInterface[property] instanceof Array) {
            let diffArray = checkIArrayDiff(diffInterface[property])
            diffInterface[property] = diffArray.array;
            if (diffArray.isDiff) diffInterface.isDiff = true;
        } else {
            let diffProperty = diffInterface[property] as diff.IDiff;
            if (!diffProperty) continue;
            if (diffProperty['typeName'] === single.ElementType.IBasicDiff) {
                diffProperty = checkIBasicDiff(diffProperty) as diff.IDiff;
            } else {
                diffProperty = checkDiffInterface(diffProperty) as diff.IDiff;
            }
            if (diffProperty.isDiff) diffInterface.isDiff = true;
        }
    }
    return diffInterface
}