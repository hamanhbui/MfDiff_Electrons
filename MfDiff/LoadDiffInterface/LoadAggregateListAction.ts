import diff = require("../DiffInterface");
import * as $ from "./"
import single = require("../SingleInterface")

/**
 * load two AggregateListActions to an IAggregateListActionDiff
 */
export function loadAggregateListAction(object1: single.IAggregateListAction, object2: single.IAggregateListAction): diff.IAggregateListActionDiff {
    return {
        typeName: single.ElementType.AggregateListAction,
        aggregateFunction: $.loadToIBasicDiff(object1.aggregateFunction, object2.aggregateFunction),
        outputVariableName: $.loadToIBasicDiff(object1.outputVariableName, object2.outputVariableName),
        inputListVariableName: $.loadToIBasicDiff(object1.inputListVariableName, object2.inputListVariableName),
        attributeName: $.loadToIBasicDiff(object1.attributeName, object2.attributeName)
    }
}