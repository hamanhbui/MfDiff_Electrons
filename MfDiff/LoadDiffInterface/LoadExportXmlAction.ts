import * as $ from "./"
import diff = require("../DiffInterface")
import single = require("../SingleInterface")

export function loadOutputMethodDiff(object1: single.IOutputMethod, object2: single.IOutputMethod): diff.IOutputMethodDiff | diff.IBasicDiff<single.IOutputMethod> {
    if (object1.typeName === object2.typeName) {
        if (object1.typeName === "FileDocumentExport") {
            let fileObject1 = object1 as single.IFileDocumentExport
            let fileObject2 = object2 as single.IFileDocumentExport
            return {
                typeName: "FileDocumentExportDiff",
                targetDocumentVariableName: $.loadToIBasicDiff(fileObject1.targetDocumentVariableName, fileObject2.targetDocumentVariableName)
            } as diff.IFileDocumentExportDiff
        }
        if (object1.typeName === "VariableExport") {
            return {
                typeName: "VariableExportDiff",
                outputVariableName: $.loadToIBasicDiff((object1 as single.IVariableExport).outputVariableName, (object1 as single.IVariableExport).outputVariableName)
            } as diff.IVariableExportDiff
        }
    }
    return $.loadToIBasicDiff(object1, object2)
}

export function loadExportXmlAction(object1: single.IExportXmlAction, object2: single.IExportXmlAction): diff.IExportXmlActionDiff {
    return {
        typeName: single.ElementType.ExportXmlAction,
        mappingName: $.loadToIBasicDiff(object1.mappingName, object2.mappingName),
        mappingArgumentVariableName: $.loadToIBasicDiff(object1.mappingArgumentVariableName, object2.mappingArgumentVariableName),
        isValidationRequired: $.loadToIBasicDiff(object1.isValidationRequired, object2.isValidationRequired),
        outputMethod: loadOutputMethodDiff(object1.outputMethod, object2.outputMethod)
    }
}