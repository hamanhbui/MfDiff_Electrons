import diff = require("../DiffInterface");
import * as $ from "./"
import single = require("../SingleInterface")

/**
 * load two DeleteActions to an IDeleteActionDiff
 */
export function loadDeleteAction(object1: single.IDeleteAction, object2: single.IDeleteAction): diff.IDeleteActionDiff {
    return {
        isDiff: true,
        typeName: single.ElementType.DeleteAction,
        deleteVariableName: $.loadToIBasicDiff(object1.deleteVariableName, object2.deleteVariableName),
        refreshInClient: $.loadToIBasicDiff(object1.refreshInClient, object2.refreshInClient)
    }
}