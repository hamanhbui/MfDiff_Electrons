import * as $ from "./"
import { microflows as mfs } from "mendixmodelsdk"
import single = require("../SingleInterface")

export function loadImportXmlAction(object: mfs.ImportXmlAction): single.IImportXmlAction {
    return {
        isSingle: true,
        typeName: single.ElementType.ImportXmlAction,
        xmlDocumentVariableName: object.xmlDocumentVariableName,
        isValidationRequired: object.isValidationRequired,
        resultHandling: $.loadResultHandling(object.resultHandling, undefined)
    }
}