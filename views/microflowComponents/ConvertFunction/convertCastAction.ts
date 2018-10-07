import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertCastAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, castAction: microflows.CastAction, type: string | undefined, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.ICastAction {
    let cpnCastAction: _cpnInterface.microflow.ICastAction = {
        geometry: convertGeometry(castAction.containerAsActionActivity.relativeMiddlePoint, castAction.containerAsActionActivity.size, 1 / 2),
        value: castAction.outputVariableName,
        returnType: type,
        type: _cpnTypeEnum.TypeEnum.CastAction,
        id: castAction.containerAsActionActivity.id,
        errorHandlingType: castAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnCastAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnCastAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (cpnCastAction.id) {
        objectInfo[cpnCastAction.id] = {
            caption: "Cast",
            returnType: cpnCastAction.returnType,
            returnName: cpnCastAction.value
        }
    }
    return cpnCastAction;
}//todo 