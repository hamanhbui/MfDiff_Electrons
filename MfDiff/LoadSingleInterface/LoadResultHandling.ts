import { microflows as mfs } from "mendixmodelsdk"
import single = require("../SingleInterface")
import * as $ from "./"

export function loadResultHandling(object: mfs.ResultHandling, type?: mfs.ResultHandlingType): single.IResultHandling {
    return {
        typeName: type ? type.name : "",
        importMappingCall: $.loadImportMappingCall(object.importMappingCall),
        outputVariableName: object.outputVariableName,
        variableDataType: object.variableDataType,
        storeInVariable: object.storeInVariable
    }
}