import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { microflows } from "mendixmodelsdk";
import { common } from "mendixmodelsdk";
export function convertAggregateListAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, aggregateListAction: microflows.AggregateListAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IAggregateListAction {
    let cpnAggregateListAction: _cpnInterface.microflow.IAggregateListAction = {
        geometry: convertGeometry(aggregateListAction.containerAsActionActivity.relativeMiddlePoint, aggregateListAction.containerAsActionActivity.size, 1 / 2),
        caption: aggregateListAction.containerAsActionActivity.caption,
        returnValue: aggregateListAction.outputVariableName,
        returnType: "Interger/Long",
        type: _cpnTypeEnum.TypeEnum.AggregateListAction,
        id: aggregateListAction.containerAsActionActivity.id,
        errorHandlingType: aggregateListAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnAggregateListAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnAggregateListAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (aggregateListAction.containerAsActionActivity.autoGenerateCaption === true) {
        cpnAggregateListAction.caption = "";
        if (aggregateListAction.aggregateFunction.name === "Count") {
            cpnAggregateListAction.caption = "Count " + aggregateListAction.inputListVariableName;
        }
        else cpnAggregateListAction.caption = "Take " + aggregateListAction.aggregateFunction.name.toLowerCase() + " of attribute '" + aggregateListAction.attributeQualifiedName.split(".")[2] + "' in " + aggregateListAction.inputListVariableName;
    }
    if (aggregateListAction.aggregateFunction.name === "Average") {
        cpnAggregateListAction.returnType = "Float"
    }
    if (cpnAggregateListAction.id) {
        objectInfo[cpnAggregateListAction.id] = {
            caption: cpnAggregateListAction.caption,
            returnName: cpnAggregateListAction.returnValue,
            returnType: cpnAggregateListAction.returnType
        }
    }
    return cpnAggregateListAction;
}