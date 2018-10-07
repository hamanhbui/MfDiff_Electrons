import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertContinueEvent(continueEvent: microflows.ContinueEvent, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IContinueEvent {
    let cpnContinueEvent: _cpnInterface.microflow.IContinueEvent = {
        geometry: convertGeometry(continueEvent.relativeMiddlePoint, continueEvent.size, 1 / 2),
        type: _cpnTypeEnum.TypeEnum.ContinueEvent,
        id: continueEvent.id
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnContinueEvent.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnContinueEvent.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    return cpnContinueEvent;
}  