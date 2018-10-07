import diff = require("../DiffInterface");
import * as $ from "./"
import single = require("../SingleInterface")

/**
 * load two CreateListAction to an ICreateListActionDiff
 */
export function loadCreateListAction(object1: single.ICreateListAction, object2: single.ICreateListAction): diff.ICreateListActionDiff {
    return {
        typeName: single.ElementType.CreateListAction,
        entityName: $.loadToIBasicDiff(object1.entityName, object2.entityName),
        outputVariableName: $.loadToIBasicDiff(object1.outputVariableName, object2.outputVariableName)
    }
}