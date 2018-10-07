import * as $ from "./"
import { microflows as mfs } from "mendixmodelsdk"
import diff = require("../SingleInterface")

export function loadImportMappingCall(object: mfs.ImportMappingCall): diff.IImportMappingCall | undefined {
    if (!object) return undefined;
    return {
        mappingArgumentVariableName: object.mappingArgumentVariableName,
        mappingName: object.mappingQualifiedName,
        range: $.loadRange(object.range)
    }
}