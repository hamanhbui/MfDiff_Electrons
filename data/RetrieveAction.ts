import single = require("../MfDiff/SingleInterface")

export const TestingMicroflow1 = [{
    typeName: single.ElementType.RetrieveAction,
    id: "12345678",
    isSingle: true,
    outputVariableName: "Output",
    retrieveSource: {
        isSingle: true,
        typeName: "DatabaseRetrieveSource",
        entityName: "MyFirstModule.Student",
        range: {
            typeName: "CustomRange",
            isSingle: true,
            limitExpression: "3",
            offsetExpression: "2"
        } as single.ICustomRange,
        xPathConstraint: "[]=[]",
        sortItemList: [{
            id: "1243445",
            name: "Age",
            value: "Ascending"
        },]
    } as single.IDatabaseRetrieveSource,
    size: {
        isSingle: true,
        width: 50,
        height: 60,
    },
    position: {
        isSingle: true,
        x: 100,
        y: 50,
    },
    returnType: "void"
} as single.IRetrieveAction]

export const TestingMicroflow2 = [{
    typeName: single.ElementType.RetrieveAction,
    isSingle: true,
    id: "12345678",
    outputVariableName: "other Output",
    retrieveSource: {
        isSingle: true,
        typeName: "DatabaseRetrieveSource",
        entityName: "MyFirstModule.Studen",
        range: {
            typeName: "ConstantRange",
            isSingle: true,
            singleObject: false,
        } as single.IConstantRange,
        xPathConstraint: `[]=[]
        [][][][]
        [][][][]
        ][][][][\n
            [][][[
                [][]]
                [][][]]
                `,
        sortItemList: [{
            id: "1243445",
            name: "Age",
            value: "Descending"
        }, {
            id: "34567",
            name: "Name",
            value: "Ascending"
        }]
    } as single.IDatabaseRetrieveSource,
    size: {
        isSingle: true,
        width: 50,
        height: 60,
    },
    position: {
        isSingle: true,
        x: 100,
        y: 50,
    },
    returnType: "void"
} as single.IRetrieveAction, {
    typeName: single.ElementType.ChangeObjectAction,
    id: "1445676",
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
