import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertShowHomePageAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, showHomePageAction: microflows.ShowHomePageAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IShowHomePageAction {
    let cpnShowHomePageAction: _cpnInterface.microflow.IShowHomePageAction = {
        geometry: convertGeometry(showHomePageAction.containerAsActionActivity.relativeMiddlePoint, showHomePageAction.containerAsActionActivity.size, 1 / 2),
        caption: showHomePageAction.containerAsActionActivity.caption,
        type: _cpnTypeEnum.TypeEnum.ShowHomePageAction,
        id: showHomePageAction.containerAsActionActivity.id,
        errorHandlingType: showHomePageAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnShowHomePageAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnShowHomePageAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (showHomePageAction.containerAsActionActivity.autoGenerateCaption === true) {
        cpnShowHomePageAction.caption = "Show home page";
    }
    if (cpnShowHomePageAction.id) {
        objectInfo[cpnShowHomePageAction.id] = {
            caption: cpnShowHomePageAction.caption,
        }
    }
    return cpnShowHomePageAction;
}