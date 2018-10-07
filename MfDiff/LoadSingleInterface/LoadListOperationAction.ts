import single = require("../SingleInterface");
import { microflows as mfs } from "mendixmodelsdk"
import * as $ from "./"

/**
 * get type of list operation (to string)
 */
function getTypeOfOperation(object: mfs.ListOperation): string {
    if (object instanceof mfs.Sort) return "Sort";
    if (object instanceof mfs.Filter) return "Filter";
    if (object instanceof mfs.Union) return "Union";
    if (object instanceof mfs.Subtract) return "Subtract";
    if (object instanceof mfs.ListEquals) return "Equals";
    if (object instanceof mfs.Intersect) return "Intersect";
    if (object instanceof mfs.Head) return "Head";
    if (object instanceof mfs.Tail) return "Tail";
    if (object instanceof mfs.Find) return "Find";
    return "Contains";
}

/**
 * load a ListOperation to IListOperation
 */
export function loadListOperation(object: mfs.ListOperation): single.IListOperation {
    if (object instanceof mfs.BinaryListOperation) {
        return {
            typeName: "BinaryListOperation",
            type: getTypeOfOperation(object),
            secondListOrObjectVariableName: object.secondListOrObjectVariableName,
        } as single.IBinaryListOperation
    }
    if (object instanceof mfs.InspectAttribute) {
        return {
            typeName: "InspectAttribute",
            type: getTypeOfOperation(object),
            expression: object.expression,
            attributeName: (object.attributeQualifiedName !== "") ? object.attributeQualifiedName : object.associationQualifiedName
        } as single.IInspectAttribute
    }
    if (object instanceof mfs.Sort) {
        return {
            typeName: "Sort",
            type: "Sort",
            sortItemList: object.sortItemList.items.map(element => $.convertSortItemToParamterMapping(element))
        } as single.ISort
    }
    return {
        typeName: getTypeOfOperation(object),
        type: getTypeOfOperation(object)
    } as single.IHeadOrTail
}

export function loadListOperationAction(object: mfs.ListOperationAction): single.IListOperationAction {
    return {
        isSingle: true,
        typeName: single.ElementType.ListOperationAction,
        outputVariableName: object.outputVariableName,
        listVariableName: object.operation && object.operation.listVariableName,
        operation: loadListOperation(object.operation),
    }
}