import { microflows as mfs } from "mendixmodelsdk"
import single = require("../SingleInterface")

export function loadOutputMethod(object: mfs.OutputMethod): single.IOutputMethod {
    if (object instanceof mfs.FileDocumentExport) {
        return {
            typeName: "FileDocumentExport",
            targetDocumentVariableName: object.targetDocumentVariableName
        } as single.IFileDocumentExport
    }
    return {
        typeName: "VariableExport",
        outputVariableName: (object as mfs.VariableExport).outputVariableName
    } as single.IVariableExport
}

export function loadExportXmlAction(object: mfs.ExportXmlAction): single.IExportXmlAction {
    return {
        isSingle: true,
        typeName: single.ElementType.ExportXmlAction,
        mappingName: object.mappingQualifiedName,
        mappingArgumentVariableName: object.mappingArgumentVariableName,
        isValidationRequired: object.isValidationRequired,
        outputMethod: loadOutputMethod(object.outputMethod)
    }
}