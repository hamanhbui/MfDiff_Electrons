import single = require("../MfDiff/SingleInterface");


export const TestingMicroflow1 = [{
    id: "change-list-action-test",
    typeName: single.ElementType.ChangeListAction,
    position: {
        x: 100,
        y: 200,
    },
    size: {
        height: 200,
        width: 100,
    },
    changeVariableName: "FirstList",
    value: "[SecondList]",
    type: "Replace"
} as single.IChangeListAction]

export const TestingMicroflow2 = [{
    id: "change-list-action-test",
    typeName: single.ElementType.ChangeListAction,
    position: {
        x: 100,
        y: 200,
    },
    size: {
        height: 200,
        width: 100,
    },
    changeVariableName: "FirstList",
    value: "",
    type: "Clear"
} as single.IChangeListAction]