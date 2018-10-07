import diff = require("../DiffInterface");
import * as $ from "./"
import single = require("../SingleInterface")

/**
 * load two BinaryListOperation to an IBinaryListOperationDiff
 */
export function loadBinaryListOperationDiff(object1: single.IBinaryListOperation, object2: single.IBinaryListOperation): diff.IBinaryListOperationDiff {
    return {
        typeName: "BinaryListOperationDiff",
        type: $.loadToIBasicDiff(object1.type, object2.type),
        secondListOrObjectVariableName: $.loadToIBasicDiff(
            object1.secondListOrObjectVariableName,
            object2.secondListOrObjectVariableName
        )
    }
}

/**
 * load two Sorts to an ISortDiff
 */
export function loadSortDiff(object1: single.ISort, object2: single.ISort): diff.ISortDiff {
    return {
        typeName: "SortDiff",
        sortItemList: $.loadArrayDiff(object1.sortItemList, object2.sortItemList,
            $.loadParameterDiff, $.compareTwoParametersById
        )
    }
}

/**
 * load two InspectAttributes to an IInspectAttributeDiff
 */
export function loadInspectAttributeDiff(object1: single.IInspectAttribute, object2: single.IInspectAttribute): diff.IInspectAttributeDiff {
    return {
        typeName: "InspectAttributeDiff",
        type: $.loadToIBasicDiff(object1.type, object2.type),
        expression: $.loadToIBasicDiff(object1.expression, object2.expression),
        attributeName: $.loadToIBasicDiff(object1.attributeName, object2.attributeName)
    }
}

/**
 * load two Head(s) or Tail(s) to an IHeadOrTailDiff
 */
export function loadHeadOrTailDiff(object1: single.IHeadOrTail, object2: single.IHeadOrTail): diff.IHeadOrTailDiff {
    return {
        type: $.loadToIBasicDiff(object1.type, object2.type),
        typeName: "HeadOrTailDiff",
    }
}

/**
 * load two ListOperations to an IListOperationDiff
 */
export function loadListOperationDiff(object1: single.IListOperation, object2: single.IListOperation): diff.IListOperationDiff | diff.IBasicDiff<single.IListOperation> {
    if (object1.typeName === object2.typeName) {
        if (object1.typeName === "BinaryListOperation") {
            return loadBinaryListOperationDiff(object1 as single.IBinaryListOperation, object2 as single.IBinaryListOperation)
        }
        if (object1.typeName === "InspectAttribute") {
            return loadInspectAttributeDiff(object1 as single.IInspectAttribute, object2 as single.IInspectAttribute)
        }
        if (object1.typeName === "Sort") {
            return loadSortDiff(object1, object2)
        }
        if (object1.typeName === "Head" || object1.typeName === "Tail") {
            return loadHeadOrTailDiff(object1 as single.IHeadOrTail, object2 as single.IHeadOrTail)
        }
    }
    return $.loadToIBasicDiff(object1, object2)
}

/**
 * load two ListOperationActions to an IListOperationActionDiff
 */
export function loadListOperationAction(object1: single.IListOperationAction, object2: single.IListOperationAction): diff.IListOperationActionDiff {
    return {
        typeName: single.ElementType.ListOperationAction,
        outputVariableName: $.loadToIBasicDiff(object1.outputVariableName, object2.outputVariableName),
        listVariableName: $.loadToIBasicDiff(object1.listVariableName, object2.listVariableName),
        operation: loadListOperationDiff(object1.operation, object2.operation)
    }
} 