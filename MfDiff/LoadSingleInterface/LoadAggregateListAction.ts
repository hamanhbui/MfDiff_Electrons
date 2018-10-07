import single = require("../SingleInterface");
import { microflows as mfs } from "mendixmodelsdk"

/**
 * load two AggregateListActions to an IAggregateListActionDiff
 */
export function loadAggregateListAction(object: mfs.AggregateListAction): single.IAggregateListAction {
    return {
        isSingle: true,
        typeName: single.ElementType.AggregateListAction,
        aggregateFunction: object.aggregateFunction.name,
        outputVariableName: object.outputVariableName,
        inputListVariableName: object.inputListVariableName,
        attributeName: object.attributeQualifiedName
    }
}