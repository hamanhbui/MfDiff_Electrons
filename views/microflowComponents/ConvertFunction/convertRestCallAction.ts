import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertRestCallAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, restCallAction: microflows.RestCallAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IRestCallAction {
    let cpnRestCallAction: _cpnInterface.microflow.IRestCallAction = {
        geometry: convertGeometry(restCallAction.containerAsActionActivity.relativeMiddlePoint, restCallAction.containerAsActionActivity.size, 1 / 2),
        caption: restCallAction.containerAsActionActivity.caption,
        returnType: restCallAction.resultHandling.variableDataType,
        variableName: restCallAction.resultHandling.outputVariableName,
        type: _cpnTypeEnum.TypeEnum.RestCallAction,
        id: restCallAction.containerAsActionActivity.id,
        errorHandlingType: restCallAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnRestCallAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnRestCallAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (restCallAction.containerAsActionActivity.autoGenerateCaption === true) {
        cpnRestCallAction.caption = "Call REST (" + restCallAction.httpConfiguration.httpMethod.name.toUpperCase() + ")";
    }
    if (restCallAction.resultHandlingType.name === "None") {
        cpnRestCallAction.returnType = "";
        cpnRestCallAction.variableName = ""
    }
    if (restCallAction.resultHandling.variableDataType === "Unknown") {
        cpnRestCallAction.returnType = "(Not set)";
    }
    if (cpnRestCallAction.returnType.includes(".")) {
        cpnRestCallAction.returnType = cpnRestCallAction.returnType.split(".")[1];
    }
    if (cpnRestCallAction.id) {
        objectInfo[cpnRestCallAction.id] = {
            caption: cpnRestCallAction.caption,
            returnName: cpnRestCallAction.variableName,
            returnType: cpnRestCallAction.returnType
        }
    }
    return cpnRestCallAction;
}//todo