import single = require("../MfDiff/SingleInterface")

export const TestingMicroflow1 = [{
    isSingle: true,
    id: "change-variable-action-test",
    typeName: single.ElementType.ChangeVariableAction,
    position: {
        isSingle: true,
        x: 100,
        y: 200,
    },
    size: {
        isSingle: true,
        height: 200,
        width: 20
    },
    value: "true",
    changeVariableName: "NewBoolean"
} as single.IChangeVariableAction]

export const TestingMicroflow2 = [{
    id: "change-variable-action-test",
    typeName: single.ElementType.ChangeVariableAction,
    position: {
        x: 100,
        y: 200,
    },
    size: {
        height: 200,
        width: 20
    },
    value: "newValue",
    changeVariableName: "new"
} as single.IChangeVariableAction]