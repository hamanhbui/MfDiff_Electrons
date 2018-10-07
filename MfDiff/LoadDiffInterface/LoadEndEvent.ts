import diff = require("../DiffInterface");
import * as $ from "./"
import single = require("../SingleInterface")

/**
 * load two EndEvents to an IEndEventDiff
 */
export function loadEndEvent(object1: single.IEndEvent, object2: single.IEndEvent): diff.IEndEventDiff {
    return {
        typeName: single.ElementType.EndEvent,
        returnValue: $.loadToIBasicDiff(object1.returnValue, object2.returnValue),
        returnType: $.loadToIBasicDiff(object1.returnType, object2.returnType)
    }
}