import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertShowPageAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, showPageAction: microflows.ShowPageAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IShowPageAction {
    let cpnShowPageAction: _cpnInterface.microflow.IShowPageAction = {
        geometry: convertGeometry(showPageAction.containerAsActionActivity.relativeMiddlePoint, showPageAction.containerAsActionActivity.size, 1 / 2),
        caption: showPageAction.containerAsActionActivity.caption,
        type: _cpnTypeEnum.TypeEnum.ShowPageAction,
        id: showPageAction.containerAsActionActivity.id,
        errorHandlingType: showPageAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnShowPageAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnShowPageAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (showPageAction.containerAsActionActivity.autoGenerateCaption === true) {
        cpnShowPageAction.caption = "Show '" + showPageAction.pageSettings.pageQualifiedName.split(".")[1] + "'";
    }
    if (cpnShowPageAction.id) {
        objectInfo[cpnShowPageAction.id] = {
            caption: cpnShowPageAction.caption
        }
    }
    return cpnShowPageAction;
}