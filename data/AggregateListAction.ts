import single = require("../MfDiff/SingleInterface")

export const TestingMicroflow1 = [{
    id: "aggregate-list-action-test",
    typeName: single.ElementType.AggregateListAction,
    position: {
        x: 100,
        y: 100,
    },
    size: {
        height: 100,
        width: 100
    },
    inputListVariableName: "TestingList",
    aggregateFunction: "Replace",
    attributeName: "TestAttributeName",
    outputVariableName: "old Variable",
} as single.IAggregateListAction]

export const TestingMicroflow2 = [{
    id: "aggregate-list-action-test",
    typeName: single.ElementType.AggregateListAction,
    position: {
        x: 100,
        y: 100,
    },
    size: {
        height: 100,
        width: 100
    },
    inputListVariableName: "TestingList2",
    aggregateFunction: "Remove",
    attributeName: "TestAttributeName",
    outputVariableName: "new Variable",
} as single.IAggregateListAction]