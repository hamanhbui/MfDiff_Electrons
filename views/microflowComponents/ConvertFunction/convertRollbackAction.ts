import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertRollbackAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, rollbackAction: microflows.RollbackAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IRollbackAction {
    let cpnRollbackAction: _cpnInterface.microflow.IRollbackAction = {
        geometry: convertGeometry(rollbackAction.containerAsActionActivity.relativeMiddlePoint, rollbackAction.containerAsActionActivity.size, 1 / 2),
        caption: rollbackAction.containerAsActionActivity.caption,
        refreshInClient: rollbackAction.refreshInClient,
        type: _cpnTypeEnum.TypeEnum.RollbackAction,
        id: rollbackAction.containerAsActionActivity.id,
        errorHandlingType: rollbackAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnRollbackAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnRollbackAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (rollbackAction.containerAsActionActivity.autoGenerateCaption === true) {
        cpnRollbackAction.caption = "Rollback " + rollbackAction.rollbackVariableName;
    }
    if (cpnRollbackAction.id) {
        objectInfo[cpnRollbackAction.id] = {
            caption: cpnRollbackAction.caption
        }
    }
    return cpnRollbackAction;
}