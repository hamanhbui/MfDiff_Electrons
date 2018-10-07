import diff = require("../DiffInterface");
import * as $ from "./"
import single = require("../SingleInterface")

/**
 * load two ChangeListAction to an IChangeListActionDiff
 */
export function loadChangeListAction(object1: single.IChangeListAction, object2: single.IChangeListAction): diff.IChangeListActionDiff {
    return {
        typeName: single.ElementType.ChangeListAction,
        changeVariableName: $.loadToIBasicDiff(object1.changeVariableName, object2.changeVariableName),
        type: $.loadToIBasicDiff(object1.type, object2.type),
        value: $.loadToIBasicDiff(object1.value, object2.value)
    }
}