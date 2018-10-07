import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertBreakEvent(breakEvent: microflows.BreakEvent, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IBreakEvent {
    let cpnBreakEvent: _cpnInterface.microflow.IBreakEvent = {
        geometry: convertGeometry(breakEvent.relativeMiddlePoint, breakEvent.size, 1 / 2),
        type: _cpnTypeEnum.TypeEnum.BreakEvent,
        id: breakEvent.id
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnBreakEvent.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnBreakEvent.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    return cpnBreakEvent;
}