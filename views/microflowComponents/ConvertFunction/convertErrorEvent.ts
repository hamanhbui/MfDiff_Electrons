import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertErrorEvent(errorEvent: microflows.ErrorEvent, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IErrorEvent {
    let cpnErrorEvent: _cpnInterface.microflow.IErrorEvent = {
        geometry: convertGeometry(errorEvent.relativeMiddlePoint, errorEvent.size, 1 / 2),
        type: _cpnTypeEnum.TypeEnum.ErrorEvent,
        id: errorEvent.id
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnErrorEvent.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnErrorEvent.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    return cpnErrorEvent;
}