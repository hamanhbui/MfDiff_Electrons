import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertInheritanceSplit(objectInfo: _cpnInterface.microflow.IObjectDict, inheritanceSplit: microflows.InheritanceSplit, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IInheritanceSplit {
    let cpnInheritanceSplit: _cpnInterface.microflow.IInheritanceSplit = {
        geometry: convertGeometry(inheritanceSplit.relativeMiddlePoint, inheritanceSplit.size, 1 / 2),
        documentation: inheritanceSplit.caption,
        type: _cpnTypeEnum.TypeEnum.InheritanceSplit,
        id: inheritanceSplit.id
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnInheritanceSplit.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnInheritanceSplit.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (cpnInheritanceSplit.id) {
        objectInfo[cpnInheritanceSplit.id] = {
            caption: cpnInheritanceSplit.documentation
        }
    }
    return cpnInheritanceSplit;
}