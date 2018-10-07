import single = require("../SingleInterface")
import diff = require("../DiffInterface");
import * as $ from "./"

/**
 * load two CreateVariableActions to an ICreateVariableActionDiff
 */
export function loadCreateVariableAction(object1: single.ICreateVariableAction, object2: single.ICreateVariableAction): diff.ICreateVariableActionDiff {
    return {
        typeName: single.ElementType.CreateVariableAction,
        initialValue: $.loadToIBasicDiff(object1.initialValue, object2.initialValue),
        variableDateType: $.loadToIBasicDiff(object1.variableDataType, object2.variableDataType),
        variableName: $.loadToIBasicDiff(object1.variableName, object2.variableName)
    }
}