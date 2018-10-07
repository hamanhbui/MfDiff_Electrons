import diff = require("../DiffInterface")
import * as $ from "../LoadDiffInterface"
import single = require("../SingleInterface")

/**
 * load two LoopedActivity to an ILoopedActivity
 * it's not possible to know if user changes flows in LoopedActivity
 */
export function loadLoopedActivity(object1: single.ILoopedActivity, object2: single.ILoopedActivity): diff.ILoopedActivity {
    return {
        typeName: single.ElementType.LoopedActivity,
        iteratedListVariableName: $.loadToIBasicDiff(object1.iteratedListVariableName, object2.iteratedListVariableName),
        loopVariableName: $.loadToIBasicDiff(object1.loopVariableName, object2.loopVariableName),
        // objectCollection: $.loadObjectCollection(object1.objectCollection, object2.objectCollection)
    }
}