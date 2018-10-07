import { microflows as mfs } from "mendixmodelsdk"
import single = require("../SingleInterface");

export function convertDocumentParameterToParameterMapping(object: mfs.DocumentTemplateParameterMapping): single.IAttribute {
    return {
        id: object.id,
        name: object.widgetName,
        value: object.argument
    }
}

export function loadGenerateDocumentAction(object: mfs.GenerateDocumentAction): single.IGenerateDocumentAction {
    return {
        isSingle: true,
        typeName: single.ElementType.GenerateDocumentAction,
        documentTemplateName: object.documentTemplateQualifiedName,
        languageType: `${object.languageSetting.name}_${object.languageVariableName}`,
        fileVariableName: object.fileVariableName,
        overrideBottomMargin: object.overrideBottomMargin,
        overrideLeftMargin: object.overrideLeftMargin,
        overrideRightMargin: object.overrideRightMargin,
        overrideTopMargin: object.overrideTopMargin,
        marginBottomInInch: object.overrideBottomMargin ? object.marginBottomInInch : "",
        marginTopInInch: object.overrideTopMargin ? object.marginTopInInch : "",
        marginLeftInInch: object.overrideLeftMargin ? object.marginLeftInInch : "",
        marginRightInInch: object.overrideRightMargin ? object.marginRightInInch : "",
        parameterMappings: object.parameterMappings.map(element => convertDocumentParameterToParameterMapping(element)),
        documentType: object.documentType.name,
    }
}