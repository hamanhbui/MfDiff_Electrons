import diff = require("../DiffInterface");
import single = require("../SingleInterface")
import * as $ from "./"

/**
 * load two MicroflowObjects to an IMfObjectDiff
 */
export function loadMfObject(object1: single.IMfObject, object2: single.IMfObject): diff.IMfObjectDiff {
    let output: diff.IMfObjectDiff = {
        typeName: single.ElementType.Undefined
    };
    if (object1.typeName.name.includes("Action")) {
        output = $.loadActionActivity(object1 as single.IActionActivity, object2);
    }
    if (object1.typeName === single.ElementType.LoopedActivity) {
        output = $.loadLoopedActivity(object1, object2)
    }
    if (object1.typeName === single.ElementType.Annotation) {
        output = $.loadAnnotation(object1, object2)
    }
    if (object1.typeName === single.ElementType.MicroflowParameterObject) {
        output = $.loadMicroflowParameterObject(object1, object2)
    }
    if (object1.typeName === single.ElementType.StartEvent) {
        output = $.loadStartEvent()
    }
    if (object1.typeName === single.ElementType.EndEvent) {
        output = $.loadEndEvent(object1, object2)
    }
    if (object1.typeName === single.ElementType.ContinueEvent) {
        output = $.loadContinueEvent()
    }
    if (object1.typeName === single.ElementType.BreakEvent) {
        output = $.loadBreakEvent()
    }
    if (object1.typeName === single.ElementType.ExclusiveMerge) {
        output = $.loadExclusiveMerge()
    }
    if (object1.typeName === single.ElementType.InheritanceSplit) {
        output = $.loadInheritanceSplit(object1, object2)
    }
    if (object1.typeName === single.ElementType.ExclusiveSplit) {
        output = $.loadExclusiveSplit(object1 as single.IExclusiveSplit, object2 as single.IExclusiveSplit)
    }
    output.position = $.loadToIPositionDiff(object1.position as single.IPoint, object2.position as single.IPoint);
    output.size = $.loadToISizeDiff(object1.size as single.ISize, object2.size as single.ISize);
    return output;
}

