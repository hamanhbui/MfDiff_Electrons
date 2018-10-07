import { microflows as mfs } from "mendixmodelsdk"
import single = require("../SingleInterface");

/**
 * load two CreateVariableActions to an ICreateVariableActionDiff
 */
export function loadCreateVariableAction(object: mfs.CreateVariableAction): single.ICreateVariableAction {
    return {
        isSingle: true,
        typeName: single.ElementType.CreateVariableAction,
        initialValue: object.initialValue,
        variableDataType: object.variableDataType,
        variableName: object.variableName,
    }
}