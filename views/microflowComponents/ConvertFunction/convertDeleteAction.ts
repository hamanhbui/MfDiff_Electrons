import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertDeleteAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, deleteAction: microflows.DeleteAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IDeleteAction {
    let cpnDeleteAction: _cpnInterface.microflow.IDeleteAction = {
        geometry: convertGeometry(deleteAction.containerAsActionActivity.relativeMiddlePoint, deleteAction.containerAsActionActivity.size, 1 / 2),
        refreshInClient: deleteAction.refreshInClient,
        caption: deleteAction.containerAsActionActivity.caption,
        type: _cpnTypeEnum.TypeEnum.DeleteObjectAction,
        id: deleteAction.containerAsActionActivity.id,
        errorHandlingType: deleteAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnDeleteAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnDeleteAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (deleteAction.containerAsActionActivity.autoGenerateCaption === true) {
        cpnDeleteAction.caption = "Delete " + deleteAction.deleteVariableName;
    }
    if (cpnDeleteAction.id) {
        objectInfo[cpnDeleteAction.id] = {
            caption: cpnDeleteAction.caption
        }
    }
    return cpnDeleteAction;
}