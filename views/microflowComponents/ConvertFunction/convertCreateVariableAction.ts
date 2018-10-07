import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertCreateVariableAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, createVariableAction: microflows.CreateVariableAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.ICreateVariableAction {
    let cpnCreateVariableAction: _cpnInterface.microflow.ICreateVariableAction = {
        geometry: convertGeometry(createVariableAction.containerAsActionActivity.relativeMiddlePoint, createVariableAction.containerAsActionActivity.size, 1 / 2),
        caption: createVariableAction.containerAsActionActivity.caption,
        variableName: createVariableAction.variableName,
        initialValue: createVariableAction.variableDataType,
        type: _cpnTypeEnum.TypeEnum.CreateVariableAction,
        id: createVariableAction.containerAsActionActivity.id,
        errorHandlingType: createVariableAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point && size) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnCreateVariableAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnCreateVariableAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (createVariableAction.containerAsActionActivity.autoGenerateCaption === true) {
        cpnCreateVariableAction.caption = "";
        if (createVariableAction.variableDataType === "Integer") {
            cpnCreateVariableAction.caption = "Create Integer/Long variable";
        }
        if (createVariableAction.variableDataType === "DateTime") {
            cpnCreateVariableAction.caption = "Create Date and time variable";
        }
        if (createVariableAction.variableDataType.includes("#")) {
            cpnCreateVariableAction.caption = "Create Enumeration " + createVariableAction.variableDataType.split("#")[1] + " variable";
        }
        else cpnCreateVariableAction.caption = "Create " + createVariableAction.variableDataType + " variable";
    }
    if (createVariableAction.variableDataType === "Integer") {
        cpnCreateVariableAction.initialValue = "Integer/Long"
    }
    else if (createVariableAction.variableDataType === "DateTime") {
        cpnCreateVariableAction.initialValue = "Date and time"
    }
    if (createVariableAction.variableDataType.includes("#")) {
        cpnCreateVariableAction.initialValue = "Enumeration " + createVariableAction.variableDataType.split(".")[1];
    }
    if (cpnCreateVariableAction.id) {
        objectInfo[cpnCreateVariableAction.id] = {
            caption: cpnCreateVariableAction.caption,
            returnName: cpnCreateVariableAction.variableName,
            returnType: cpnCreateVariableAction.initialValue
        }
    }
    return cpnCreateVariableAction;
}