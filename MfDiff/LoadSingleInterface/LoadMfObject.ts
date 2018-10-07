import { microflows as mfs } from "mendixmodelsdk"
import single = require("../SingleInterface");
import * as $ from "./"

/**
 * load two MicroflowObjects to an IMfObjectDiff
 */
export function loadMfObject(object: mfs.MicroflowObject, listMfCpnBasicInfo: single.IMfCpnBasicInfo[]): single.IMfObject {
    let output: single.IMfObject = {
        isSingle: true,
        typeName: single.ElementType.Undefined
    };
    if (object instanceof mfs.ActionActivity) {
        output = $.loadActionActivity(object, listMfCpnBasicInfo);
    }
    if (object instanceof mfs.LoopedActivity) {
        output = $.loadLoopedActivity(object, listMfCpnBasicInfo)
    }
    if (object instanceof mfs.Annotation) {
        output = $.loadAnnotation(object)
    }
    if (object instanceof mfs.MicroflowParameterObject) {
        output = $.loadMicroflowParameterObject(object)
    }
    if (object instanceof mfs.StartEvent) {
        output = $.loadStartEvent()
    }
    if (object instanceof mfs.EndEvent) {
        output = $.loadEndEvent(object)
    }
    if (object instanceof mfs.ContinueEvent) {
        output = $.loadContinueEvent()
    }
    if (object instanceof mfs.BreakEvent) {
        output = $.loadBreakEvent()
    }
    if (object instanceof mfs.ExclusiveMerge) {
        output = $.loadExclusiveMerge()
    }
    if (object instanceof mfs.InheritanceSplit) {
        output = $.loadInheritanceSplit(object)
    }
    if (object instanceof mfs.ExclusiveSplit) {
        output = $.loadExclusiveSplit(object)
    }
    output.position = { ...object.relativeMiddlePoint, isSingle: true };
    output.size = { ...object.size, isSingle: true };
    output.parentElement = { isSingle: true, id: object.container.container.id, typeName: new single.ElementType(object.container.container.structureTypeName) };
    return output;
}

