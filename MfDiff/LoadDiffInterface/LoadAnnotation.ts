import diff = require("../DiffInterface")
import * as $ from "../LoadDiffInterface"
import single = require("../SingleInterface")

/**
 * load two Annotations to an IAnnotationDiff
 */
export function loadAnnotation(object1: single.IAnnotation, object2: single.IAnnotation): diff.IAnnotationDiff {
    return {
        typeName: single.ElementType.Annotation,
        caption: $.loadToIBasicDiff(object1.caption, object2.caption)
    }
}