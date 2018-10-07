import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertCloseFormAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, closeFormAction: microflows.CloseFormAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IClosePageAction {
    let cpnClosePageAction: _cpnInterface.microflow.IClosePageAction = {
        geometry: convertGeometry(closeFormAction.containerAsActionActivity.relativeMiddlePoint, closeFormAction.containerAsActionActivity.size, 1 / 2),
        caption: closeFormAction.containerAsActionActivity.caption,
        type: _cpnTypeEnum.TypeEnum.ClosePageAction,
        id: closeFormAction.containerAsActionActivity.id,
        errorHandlingType: closeFormAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnClosePageAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnClosePageAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (closeFormAction.containerAsActionActivity.autoGenerateCaption === true) {
        cpnClosePageAction.caption = "Close page";
    }
    if (cpnClosePageAction.id) {
        objectInfo[cpnClosePageAction.id] = {
            caption: cpnClosePageAction.caption
        }
    }
    return cpnClosePageAction;
}