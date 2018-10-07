import single = require("../MfDiff/SingleInterface")
export const TestingMicroflow1 = [{
    isSingle: true,
    id: "annotation-test",
    typeName: single.ElementType.Annotation,
    caption: "This is first annotation",
    position: {
        isSingle: true,
        x: 100,
        y: 100,
    },
    size: {
        isSingle: true,
        height: 100,
        width: 200
    }
} as single.IAnnotation]

export const TestingMicroflow2 = [{
    isSingle: true,
    id: "annotation-test",
    typeName: single.ElementType.Annotation,
    caption: "This is second annotation",
    position: {
        isSingle: true,
        x: 200,
        y: 100
    },
    size: {
        isSingle: true,
        width: 100,
        height: 200
    }
} as single.IAnnotation]