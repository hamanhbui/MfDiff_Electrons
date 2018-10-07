import single = require("../MfDiff/SingleInterface")

export const TestingMicroflow1 = [{
    id: "create-list-action-test",
    typeName: single.ElementType.CreateListAction,
    position: {
        x: 100,
        y: 100
    },
    size: {
        width: 200,
        height: 200
    },
    outputVariableName: "New List",
    entityName: "Student"
} as single.ICreateListAction]

export const TestingMicroflow2 = [{
    id: "create-list-action-test",
    typeName: single.ElementType.CreateListAction,
    position: {
        x: 200,
        y: 100
    },
    size: {
        width: 200,
        height: 200
    },
    outputVariableName: "Second List",
    entityName: "Subject"
} as single.ICreateListAction]