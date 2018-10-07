import single = require("../MfDiff/SingleInterface")

export const TestingMicroflow1 = [{
    id: "generate-document-action-test",
    typeName: single.ElementType.GenerateDocumentAction,
    position: {
        x: 100,
        y: 1
    },
    size: {
        height: 100,
        width: 200,
    },
    fileVariableName: "new file",
    documentType: "HTML (.html)",
    documentTemplateName: "new template",
    marginBottomInInch: "2",
    marginLeftInInch: "3",
    marginRightInInch: "4",
    marginTopInInch: "5",
    overrideBottomMargin: true,
    overrideLeftMargin: false,
    overrideRightMargin: false,
    overrideTopMargin: true,
    parameterMappings: [{
        id: "111",
        name: "First",
        value: "NewName"
    }, {
        id: "222",
        name: "Second",
        value: "true"
    }],
    languageType: "Variable_NewStudent"

} as single.IGenerateDocumentAction]

export const TestingMicroflow2 = [{
    id: "generate-document-action-test",
    typeName: single.ElementType.GenerateDocumentAction,
    position: {
        x: 100,
        y: 1
    },
    size: {
        height: 100,
        width: 200,
    },
    fileVariableName: "old file",
    documentType: "HTML (.html)",
    documentTemplateName: "new template",
    marginBottomInInch: "1",
    marginLeftInInch: "3",
    marginRightInInch: "4",
    marginTopInInch: "5",
    overrideBottomMargin: true,
    overrideLeftMargin: true,
    overrideRightMargin: false,
    overrideTopMargin: true,
    parameterMappings: [{
        id: "111",
        name: "First",
        value: "NewName"
    }, {
        id: "333",
        name: "Second",
        type: "Boolean",
        value: "true"
    }],
    languageType: "Variable_NewStudent"

} as single.IGenerateDocumentAction]