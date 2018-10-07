import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertChangeListAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, changeListAction: microflows.ChangeListAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IChangeListAction {
    let cpnChangeListAction: _cpnInterface.microflow.IChangeListAction = {
        geometry: convertGeometry(changeListAction.containerAsActionActivity.relativeMiddlePoint, changeListAction.containerAsActionActivity.size, 1 / 2),
        caption: changeListAction.containerAsActionActivity.caption,
        type: _cpnTypeEnum.TypeEnum.ChangeListAction,
        id: changeListAction.containerAsActionActivity.id,
        errorHandlingType: changeListAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnChangeListAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnChangeListAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (changeListAction.containerAsActionActivity.autoGenerateCaption === true) {
        if (changeListAction.type === microflows.ChangeListActionType.Clear) {
            cpnChangeListAction.caption = "Clear list " + changeListAction.changeVariableName;
        }
        else if (changeListAction.type === microflows.ChangeListActionType.Remove) {
            cpnChangeListAction.caption = "Remove from list " + changeListAction.changeVariableName;
        }
        else if (changeListAction.type === microflows.ChangeListActionType.Add) {
            cpnChangeListAction.caption = "Add to list " + changeListAction.changeVariableName;
        }
        else if (changeListAction.type === microflows.ChangeListActionType.Set) {
            cpnChangeListAction.caption = "Set list " + changeListAction.changeVariableName;
        }
    }
    if (cpnChangeListAction.id) {
        objectInfo[cpnChangeListAction.id] = {
            caption: cpnChangeListAction.caption,
        }
    }
    return cpnChangeListAction;
}