import single = require("../SingleInterface")
import { microflows as mfs } from "mendixmodelsdk"

export function getTypeOfMfParameterObject(type: string): string {
    let output = type;
    if (type.endsWith(']')) {
        output = "List of " + type.slice(1, type.length - 1);
    } else if (type.startsWith('#')) {
        output = "Enumeration " + type.slice(1);
    }
    return output;
}

/**
 * load two MicroflowParameterObjects to an IMicroflowParameterObjectDiffB
 */
export function loadMicroflowParameterObject(object: mfs.MicroflowParameterObject): single.IMicroflowParameterObject {
    return {
        isSingle: true,
        typeName: single.ElementType.MicroflowParameterObject,
        name: object.name,
        type: getTypeOfMfParameterObject(object.type),
        documentation: object.documentation
    }
}