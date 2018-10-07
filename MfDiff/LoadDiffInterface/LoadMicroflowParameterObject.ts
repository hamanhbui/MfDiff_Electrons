import diff = require("../DiffInterface")
import * as $ from "../LoadDiffInterface"
import single = require("../SingleInterface")

/**
 * load two MicroflowParameterObjects to an IMicroflowParameterObjectDiffB
 */
export function loadMicroflowParameterObject(object1: single.IMicroflowParameterObject, object2: single.IMicroflowParameterObject): diff.IMicroflowParameterObjectDiff {
    return {
        typeName: single.ElementType.MicroflowParameterObject,
        name: $.loadToIBasicDiff(object1.name, object2.name),
        type: $.loadToIBasicDiff(object1.type, object2.type),
        documentation: $.loadToIBasicDiff(object1.documentation, object2.documentation)
    }
}