import _cpnInterface = require("../interfaces")
import { common } from "mendixmodelsdk";
export function convertGeometry(middlePoint: common.IPoint, size: common.ISize, ratio?: number): _cpnInterface.microflow.IGeometry {
    let geometry: _cpnInterface.microflow.IGeometry;
    if (ratio) {
        geometry = {
            top: middlePoint.y - ratio * size.height,
            left: middlePoint.x - ratio * size.width,
            width: size.width,
            height: size.height,
        }
    }
    else {
        geometry = {
            top: middlePoint.y,
            left: middlePoint.x,
            width: size.width,
            height: size.height,
        }
    }
    return geometry;
}