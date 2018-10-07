import single = require("../SingleInterface")
import { microflows as mfs } from "mendixmodelsdk"

/**
 * load two Annotations to an IAnnotationDiff
 */
export function loadAnnotation(object: mfs.Annotation): single.IAnnotation {
    return {
        isSingle: true,
        typeName: single.ElementType.Annotation,
        caption: object.caption
    }
}