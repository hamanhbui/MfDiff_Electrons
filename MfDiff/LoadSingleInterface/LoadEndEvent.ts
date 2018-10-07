import { microflows as mfs } from "mendixmodelsdk"
import single = require("../SingleInterface");

export function getReturnType(returnType: string): string | undefined {
    if (!returnType) return undefined;
    if (returnType === "Void") {
        return "Nothing"
    }
    if (returnType.startsWith("[")) {
        return "List of " + returnType.slice(1, returnType.length - 1);
    }
    if (returnType.startsWith("#")) {
        return "Enumeration " + returnType.split(".")[1];
    }
    if (returnType.includes(".")) {
        return returnType.split(".")[1]
    }
    return returnType
}

/**
 * load two EndEvents to an IEndEventDiff
 */
export function loadEndEvent(object: mfs.EndEvent): single.IEndEvent {
    return {
        isSingle: true,
        typeName: single.ElementType.EndEvent,
        returnValue: object.returnValue,
        returnType: getReturnType(object.containerAsMicroflowObjectCollection.containerAsMicroflowBase.returnType),
    }
}