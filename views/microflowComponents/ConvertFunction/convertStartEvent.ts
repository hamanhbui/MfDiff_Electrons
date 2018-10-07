import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { microflows } from "mendixmodelsdk";
import { common } from "mendixmodelsdk";
export function convertStartEvent(startEvent: microflows.StartEvent, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IStartEvent {
    let cpnStartEvent: _cpnInterface.microflow.IStartEvent = {
        geometry: convertGeometry(startEvent.relativeMiddlePoint, startEvent.size, 1 / 2),
        type: _cpnTypeEnum.TypeEnum.Start,
        id: startEvent.id
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnStartEvent.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnStartEvent.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    return cpnStartEvent;
}