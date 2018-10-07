import diff = require("../DiffInterface");
import single = require("../SingleInterface")
import * as $ from "./"

/**
 * load two CastAction to an ICastActionDiff
 */
export function loadCastAction(object1: single.ICastAction, object2: single.ICastAction): diff.ICastActionDiff {
    return {
        isDiff: true,
        typeName: single.ElementType.CastAction,
        outputVariableName: $.loadToIBasicDiff(object1.outputVariableName, object2.outputVariableName)
    }
}