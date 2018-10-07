import diff = require("../DiffInterface");
import single = require("../SingleInterface")
import * as $ from "./"

/**
 * load two InheritanceSplits to IInheritanceSpitDiff
 */
export function loadInheritanceSplit(object1: single.IInheritanceSplit, object2: single.IInheritanceSplit): diff.IInheritanceSplitDiff {
    return {
        typeName: single.ElementType.InheritanceSplit,
        caption: $.loadToIBasicDiff(object1.caption, object2.caption),
        splitVariableName: $.loadToIBasicDiff(object1.splitVariableName, object2.splitVariableName),
    }
}