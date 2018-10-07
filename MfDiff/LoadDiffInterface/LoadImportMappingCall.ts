import * as $ from "./"
import diff = require("../DiffInterface")
import single = require("../SingleInterface")

export function loadImportMappingCall(object1: single.IImportMappingCall | undefined, object2: single.IImportMappingCall | undefined): diff.IImportMappingCallDiff | undefined {
    if (!object1 || !object2) return undefined;
    return {
        mappingArgumentVariableName: $.loadToIBasicDiff(object1.mappingArgumentVariableName, object2.mappingArgumentVariableName),
        mappingName: $.loadToIBasicDiff(object1.mappingName, object2.mappingName),
        range: $.loadRangeDiff(object1.range, object2.range)
    }
}