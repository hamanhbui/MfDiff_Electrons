import diff = require("../DiffInterface");
import single = require("../SingleInterface")
import * as $ from "./"

/**
 * load two ChangeVariableActions to an IChangeVariableActionDiff
 */
export function loadChangeVariableAction(object1: single.IChangeVariableAction, object2: single.IChangeVariableAction): diff.IChangeVariableActionDiff {
    return {
        typeName: single.ElementType.ChangeVariableAction,
        changeVariableName: $.loadToIBasicDiff(object1.changeVariableName, object2.changeVariableName),
        value: $.loadToIBasicDiff(object1.value, object2.value)
    }
}