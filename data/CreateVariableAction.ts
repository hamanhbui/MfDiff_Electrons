import single = require("../MfDiff/SingleInterface")

export const TestingMicroflow1 = [{
    id: "create-variable-action-test",
    typeName: single.ElementType.CreateVariableAction,
    position: {
        x: 100,
        y: 200,
    },
    size: {
        height: 200,
        width: 20
    },
    initialValue: "0",
    variableDataType: "Boolean",
    variableName: "NewBoolean"
} as single.ICreateVariableAction]

export const TestingMicroflow2 = [{
    id: "create-variable-action-test",
    typeName: single.ElementType.CreateVariableAction,
    position: {
        x: 100,
        y: 200,
    },
    size: {
        height: 200,
        width: 20
    },
    initialValue: "0",
    variableDataType: "String",
    variableName: "OldString"
} as single.ICreateVariableAction]