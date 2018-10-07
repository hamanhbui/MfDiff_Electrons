import single = require("../MfDiff/SingleInterface")
export const TestingMicroflow1 = [{
    typeName: single.ElementType.CreateObjectAction,
    id: "create-object-action-test",
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
        id: "1",
        name: "Age",
        type: "String",
        value: "abcdfd",
        operation: "set",
    } as single.ISortItem],
    commit: "Yes",
    refreshInClient: false,
    entityName: "Student"
} as single.ICreateObjectAction]

export const TestingMicroflow2 = [{
    typeName: single.ElementType.CreateObjectAction,
    id: "create-object-action-test",
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
        id: "1",
        name: "Age",
        type: "String",
        value: "tung",
        operation: "set",
    }],
    commit: "Yes without events",
    refreshInClient: false,
    entityName: "Subject"
} as single.ICreateObjectAction]