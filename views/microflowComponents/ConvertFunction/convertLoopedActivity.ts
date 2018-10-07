import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertLoopedActivity(loopedInside: microflows.LoopedActivity, point?: common.IPoint | undefined,
    size?: common.ISize | undefined): _cpnInterface.microflow.ILoopedActivity {
    let cpnLoopedInside: _cpnInterface.microflow.ILoopedActivity = {
        geometry: convertGeometry(loopedInside.relativeMiddlePoint, loopedInside.size, 1 / 2),
        objectCollection: loopedInside.objectCollection,
        type: _cpnTypeEnum.TypeEnum.LoopedAcivity,
        iteratedListVariableName: loopedInside.iteratedListVariableName,
        loopVariableName: loopedInside.loopVariableName,
        id: loopedInside.id,
        errorHandlingType: loopedInside.errorHandlingType.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedOutside: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnLoopedInside.geometry.left += cpnLoopedOutside.geometry.left;
        cpnLoopedInside.geometry.top += cpnLoopedOutside.geometry.top;
    }
    return cpnLoopedInside;
}