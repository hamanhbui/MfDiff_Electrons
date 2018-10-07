import single = require("../SingleInterface")
import diff = require("../DiffInterface");
import * as $ from "./"

export function loadGenerateDocumentAction(object1: single.IGenerateDocumentAction, object2: single.IGenerateDocumentAction): diff.IGenerateDocumentActionDiff {
    return {
        typeName: single.ElementType.GenerateDocumentAction,
        documentTemplateName: $.loadToIBasicDiff(
            object1.documentTemplateName,
            object2.documentTemplateName
        ),
        languageType: $.loadToIBasicDiff(object1.languageType, object2.languageType),
        fileVariableName: $.loadToIBasicDiff(object1.fileVariableName, object2.fileVariableName),
        overrideBottomMargin: $.loadToIBasicDiff(object1.overrideBottomMargin, object2.overrideBottomMargin),
        overrideLeftMargin: $.loadToIBasicDiff(object1.overrideLeftMargin, object2.overrideLeftMargin),
        overrideRightMargin: $.loadToIBasicDiff(object1.overrideRightMargin, object2.overrideRightMargin),
        overrideTopMargin: $.loadToIBasicDiff(object1.overrideTopMargin, object2.overrideTopMargin),
        marginBottomInInch: $.loadToIBasicDiff(object1.marginBottomInInch, object2.marginBottomInInch),
        marginTopInInch: $.loadToIBasicDiff(object1.marginTopInInch, object2.marginTopInInch),
        marginLeftInInch: $.loadToIBasicDiff(object1.marginLeftInInch, object2.marginLeftInInch),
        marginRightInInch: $.loadToIBasicDiff(object1.marginRightInInch, object2.marginRightInInch),
        parameterMappings: (object1.documentTemplateName === object2.documentTemplateName) ?
            $.loadArrayDiff(object1.parameterMappings, object2.parameterMappings,
                $.loadParameterDiff, $.compareTwoParametersById
            ) :
            $.loadToIBasicDiff(object1.parameterMappings, object2.parameterMappings),
        documentType: $.loadToIBasicDiff(object1.documentType, object2.documentType)

    }
}