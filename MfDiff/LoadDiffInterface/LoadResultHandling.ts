import * as $ from "./"
import diff = require("../DiffInterface")
import single = require("../SingleInterface")

export function loadResultHandlingDiff(object1: single.IResultHandling, type1: string, object2: single.IResultHandling, type2: string): diff.IResultHandlingDiff | diff.IBasicDiff<single.IResultHandling> {
    if (!type1 || !type2 || type1 === type2) {
        return {
            outputVariableName: $.loadToIBasicDiff(object1.outputVariableName, object2.outputVariableName),
            storeInVariable: $.loadToIBasicDiff(object1.storeInVariable, object2.storeInVariable),
            variableDataType: $.loadToIBasicDiff(object1.variableDataType, object2.variableDataType),
            importMappingCall: $.loadImportMappingCall(object1.importMappingCall, object2.importMappingCall)
        }
    }
    return $.loadToIBasicDiff(object1, object2);
}
