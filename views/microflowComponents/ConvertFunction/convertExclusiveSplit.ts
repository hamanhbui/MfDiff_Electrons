import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertExclusiveSplit(objectInfo: _cpnInterface.microflow.IObjectDict, exclusiveSplit: microflows.ExclusiveSplit, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IExclusiveSplit {
    let cpnExclusiveSplit: _cpnInterface.microflow.IExclusiveSplit = {
        geometry: convertGeometry(exclusiveSplit.relativeMiddlePoint, exclusiveSplit.size, 1 / 2),
        documentation: exclusiveSplit.caption,
        type: _cpnTypeEnum.TypeEnum.ExclusiveSplit,
        id: exclusiveSplit.id,
        errorHandlingType: exclusiveSplit.errorHandlingType.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnExclusiveSplit.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnExclusiveSplit.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (cpnExclusiveSplit.id) {
        objectInfo[cpnExclusiveSplit.id] = {
            caption: cpnExclusiveSplit.documentation
        }
    }
    return cpnExclusiveSplit;
}