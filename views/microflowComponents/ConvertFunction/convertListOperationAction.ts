import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertListOperationAction(objectInfo: _cpnInterface.microflow.IObjectDict, mf: microflows.Microflow, mfObj: microflows.ActionActivity, listoperationAction: microflows.ListOperationAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IListOperation {
    let cpnCreateListOperationnAction: _cpnInterface.microflow.IListOperation = {
        geometry: convertGeometry(listoperationAction.containerAsActionActivity.relativeMiddlePoint, listoperationAction.containerAsActionActivity.size, 1 / 2),
        caption: listoperationAction.containerAsActionActivity.caption,
        variableName: listoperationAction.outputVariableName,
        type: _cpnTypeEnum.TypeEnum.ListOperation,
        id: listoperationAction.containerAsActionActivity.id,
        returnType: "",
        errorHandlingType: listoperationAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    mf.objectCollection.objects.forEach(mfObj => {
        if (mfObj instanceof microflows.ActionActivity && mfObj.action instanceof microflows.CreateListAction) {
            let createListAction = mfObj.action as microflows.CreateListAction;
            if (createListAction.outputVariableName === listoperationAction.operation.listVariableName) {
                cpnCreateListOperationnAction.returnType = createListAction.entityQualifiedName.split(".")[1]
            }
        }
    });
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnCreateListOperationnAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnCreateListOperationnAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (listoperationAction.containerAsActionActivity.autoGenerateCaption === true) {
        cpnCreateListOperationnAction.caption = "";
        cpnCreateListOperationnAction.caption = listoperationAction.operation.structureTypeName.split("$")[1];
        if (listoperationAction.operation.structureTypeName.split("$")[1] === "ListEquals") {
            cpnCreateListOperationnAction.caption = "Equals";
        }
    }
    if (listoperationAction.operation.structureTypeName.split("$")[1] === "ListEquals" || listoperationAction.operation.structureTypeName.split("$")[1] === "Contains") {
        cpnCreateListOperationnAction.returnType = "Boolean";
    }
    else if (listoperationAction.operation.structureTypeName.split("$")[1] != "Find" && listoperationAction.operation.structureTypeName.split("$")[1] != "Head") {
        cpnCreateListOperationnAction.returnType = "List of " + cpnCreateListOperationnAction.returnType;
    }
    if (cpnCreateListOperationnAction.id) {
        objectInfo[cpnCreateListOperationnAction.id] = {
            caption: cpnCreateListOperationnAction.caption,
            returnName: cpnCreateListOperationnAction.variableName,
            returnType: cpnCreateListOperationnAction.returnType
        }
    }
    return cpnCreateListOperationnAction;
}