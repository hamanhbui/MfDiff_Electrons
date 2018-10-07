import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertLogMessageAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, logMessageAction: microflows.LogMessageAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.ILogMessageAction {
    let cpnLogMessageAction: _cpnInterface.microflow.ILogMessageAction = {
        geometry: convertGeometry(logMessageAction.containerAsActionActivity.relativeMiddlePoint, logMessageAction.containerAsActionActivity.size, 1 / 2),
        caption: logMessageAction.containerAsActionActivity.caption,
        type: _cpnTypeEnum.TypeEnum.LogMessageAction,
        id: logMessageAction.containerAsActionActivity.id,
        errorHandlingType: logMessageAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnLogMessageAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnLogMessageAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (logMessageAction.containerAsActionActivity.autoGenerateCaption === true) {
        cpnLogMessageAction.caption = "Log message (" + logMessageAction.level.name.toLowerCase() + ")";
    }
    if (cpnLogMessageAction.id) {
        objectInfo[cpnLogMessageAction.id] = {
            caption: cpnLogMessageAction.caption,
        }
    }
    return cpnLogMessageAction;
}