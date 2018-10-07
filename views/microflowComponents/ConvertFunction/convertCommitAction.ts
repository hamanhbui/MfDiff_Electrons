import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertCommitAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, commitAction: microflows.CommitAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.ICommitAction {
    let cpnCommitAction: _cpnInterface.microflow.ICommitAction = {
        geometry: convertGeometry(commitAction.containerAsActionActivity.relativeMiddlePoint, commitAction.containerAsActionActivity.size, 1 / 2),
        caption: commitAction.containerAsActionActivity.caption,
        refreshInClient: commitAction.refreshInClient,
        withEvents: commitAction.withEvents,
        type: _cpnTypeEnum.TypeEnum.CommitAction,
        id: commitAction.containerAsActionActivity.id,
        errorHandlingType: commitAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnCommitAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnCommitAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (commitAction.containerAsActionActivity.autoGenerateCaption === true) {
        cpnCommitAction.caption = "Commit '" + commitAction.commitVariableName;
    }
    if (cpnCommitAction.id) {
        objectInfo[cpnCommitAction.id] = {
            caption: cpnCommitAction.caption
        }
    }
    return cpnCommitAction;
}