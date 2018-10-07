import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertChangeVariableAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, changeVariableAction: microflows.ChangeVariableAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IChangeVariableAction {
    let cpnChangeVariableAction: _cpnInterface.microflow.IChangeVariableAction = {
        geometry: convertGeometry(changeVariableAction.containerAsActionActivity.relativeMiddlePoint, changeVariableAction.containerAsActionActivity.size, 1 / 2),
        caption: changeVariableAction.containerAsActionActivity.caption,
        type: _cpnTypeEnum.TypeEnum.ChangeVariableAction,
        id: changeVariableAction.containerAsActionActivity.id,
        errorHandlingType: changeVariableAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnChangeVariableAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnChangeVariableAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (changeVariableAction.containerAsActionActivity.autoGenerateCaption === true) {
        cpnChangeVariableAction.caption = "";
        cpnChangeVariableAction.caption = "Change variable " + changeVariableAction.changeVariableName;
    }
    if (cpnChangeVariableAction.id) {
        objectInfo[cpnChangeVariableAction.id] = {
            caption: cpnChangeVariableAction.caption,
        }
    }
    return cpnChangeVariableAction;
} 