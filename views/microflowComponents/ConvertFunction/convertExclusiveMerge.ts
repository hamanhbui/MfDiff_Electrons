import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertExclusiveMerge(exclusiveMerge: microflows.ExclusiveMerge, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IExclusiveMerge {
    let cpnExclusiveMerge: _cpnInterface.microflow.IExclusiveMerge = {
        geometry: convertGeometry(exclusiveMerge.relativeMiddlePoint, exclusiveMerge.size, 1 / 2),
        type: _cpnTypeEnum.TypeEnum.ExclusiveMerge,
        id: exclusiveMerge.id
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnExclusiveMerge.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnExclusiveMerge.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    return cpnExclusiveMerge;
}