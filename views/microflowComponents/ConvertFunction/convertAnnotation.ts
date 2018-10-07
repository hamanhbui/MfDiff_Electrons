import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { microflows } from "mendixmodelsdk";
import { common } from "mendixmodelsdk";
export function convertAnnotation(objectInfo: _cpnInterface.microflow.IObjectDict, annotation: microflows.Annotation, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IAnnotation {
    let cpnAnnotation: _cpnInterface.microflow.IAnnotation = {
        geometry: convertGeometry(annotation.relativeMiddlePoint, annotation.size, 1 / 2),
        documentation: annotation.caption,
        id: annotation.id,
        type: _cpnTypeEnum.TypeEnum.Annotation
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnAnnotation.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnAnnotation.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (cpnAnnotation.id) {
        objectInfo[cpnAnnotation.id] = {
            caption: cpnAnnotation.documentation
        }
    }
    return cpnAnnotation;
} 