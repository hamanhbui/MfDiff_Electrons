import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertShowMessageAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, showMessageAction: microflows.ShowMessageAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IShowMessageAction {
    let cpnShowMessageAction: _cpnInterface.microflow.IShowMessageAction = {
        geometry: convertGeometry(showMessageAction.containerAsActionActivity.relativeMiddlePoint, showMessageAction.containerAsActionActivity.size, 1 / 2),
        messagetype: showMessageAction.type.name,
        caption: showMessageAction.containerAsActionActivity.caption,
        type: _cpnTypeEnum.TypeEnum.ShowMessageAction,
        id: showMessageAction.containerAsActionActivity.id,
        errorHandlingType: showMessageAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnShowMessageAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnShowMessageAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (showMessageAction.containerAsActionActivity.autoGenerateCaption === true) {
        cpnShowMessageAction.caption = "";
        for (var count = 0; count < showMessageAction.template.text.translations.length; count++) {
            cpnShowMessageAction.caption += showMessageAction.template.text.translations[count].text;
        }
    }
    if (cpnShowMessageAction.id) {
        objectInfo[cpnShowMessageAction.id] = {
            caption: cpnShowMessageAction.caption,
        }
    }
    return cpnShowMessageAction;
}