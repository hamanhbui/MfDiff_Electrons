import single = require("../MfDiff/SingleInterface")
export const TestingMicroflow1 = [{
    typeName: single.ElementType.ChangeObjectAction,
    id: "changeobjectaction-test",
    isSingle: true,
    position: {
        isSingle: true,
        x: 100,
        y: 100
    },
    size: {
        isSingle: true,
        width: 200,
        height: 200,
    },
    items: [{
        name: "Age",
        type: "String",
        value: "abcdfd",
        operation: "set",
    }],
    commit: "Refresh in client",
    refreshInClient: false,
    changeVariableName: "Student",
} as single.IChangeObjectAction]

export const TestingMicroflow2 = [{
    typeName: single.ElementType.ChangeObjectAction,
    id: "changeobjectaction-test",
    isSingle: true,
    position: {
        isSingle: true,
        x: 100,
        y: 100
    },
    size: {
        isSingle: true,
        width: 200,
        height: 200,
    },
    items: [{
        name: "Age",
        type: "String",
        value: "tung",
        operation: "set",
    }],
    commit: "Refresh in client",
    refreshInClient: true,
    changeVariableName: "Student",
} as single.IChangeObjectAction]