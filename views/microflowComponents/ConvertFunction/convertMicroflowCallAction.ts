import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertMicroflowCallAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, microflowCallAction: microflows.MicroflowCallAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IMicroflowCallAction {
    let cpnMicroflowCallAction: _cpnInterface.microflow.IMicroflowCallAction = {
        geometry: convertGeometry(microflowCallAction.containerAsActionActivity.relativeMiddlePoint, microflowCallAction.containerAsActionActivity.size, 1 / 2),
        caption: microflowCallAction.containerAsActionActivity.caption,
        returnName: microflowCallAction.outputVariableName,
        returnType: (microflowCallAction.microflowCall.microflow) ? microflowCallAction.microflowCall.microflow.returnType : undefined,
        type: _cpnTypeEnum.TypeEnum.MicroflowCallAction,
        id: microflowCallAction.containerAsActionActivity.id,
        errorHandlingType: microflowCallAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnMicroflowCallAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnMicroflowCallAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (microflowCallAction.microflowCall.microflow && microflowCallAction.microflowCall.microflow.returnType === "Void") {
        cpnMicroflowCallAction.returnName = "",
            cpnMicroflowCallAction.returnType = ""
    }
    if (microflowCallAction.microflowCall.microflow && microflowCallAction.microflowCall.microflow.returnType != "Void") {
        let result = microflowCallAction.microflowCall.microflow.returnType;
        if (result.includes(".")) {
            cpnMicroflowCallAction.returnType = result.split(".")[1];
        }
    }
    if (microflowCallAction.containerAsActionActivity.autoGenerateCaption === true) {
        cpnMicroflowCallAction.caption = microflowCallAction.microflowCall.microflowQualifiedName.split(".")[1];
    }
    if (cpnMicroflowCallAction.id) {
        objectInfo[cpnMicroflowCallAction.id] = {
            caption: cpnMicroflowCallAction.caption,
            returnName: cpnMicroflowCallAction.returnName,
            returnType: cpnMicroflowCallAction.returnType
        }
    }
    return cpnMicroflowCallAction;
} 