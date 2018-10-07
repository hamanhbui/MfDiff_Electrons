import diff = require("../DiffInterface");
import * as $ from "./"
import single = require("../SingleInterface")

/**
 * load two RollbackActions to an IRollbackActionDiff
 */
export function loadRollbackAction(object1: single.IRollbackAction, object2: single.IRollbackAction): diff.IRollbackActionDiff {
    return {
        isDiff: true,
        typeName: single.ElementType.RollbackAction,
        rollbackVariableName: $.loadToIBasicDiff(object1.rollbackVariableName, object2.rollbackVariableName),
        refreshInClient: $.loadToIBasicDiff(object1.refreshInClient, object2.refreshInClient)
    }
}