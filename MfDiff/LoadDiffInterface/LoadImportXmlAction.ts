import * as $ from "./"
import diff = require("../DiffInterface")
import single = require("../SingleInterface")

export function loadImportXmlAction(object1: single.IImportXmlAction, object2: single.IImportXmlAction): diff.IImportXmlActionDiff {
    return {
        typeName: single.ElementType.ImportXmlAction,
        xmlDocumentVariableName: $.loadToIBasicDiff(object1.xmlDocumentVariableName, object2.xmlDocumentVariableName),
        isValidationRequired: $.loadToIBasicDiff(object1.isValidationRequired, object2.isValidationRequired),
        resultHandling: $.loadResultHandlingDiff(object1.resultHandling, "", object2.resultHandling, "")
    }
}