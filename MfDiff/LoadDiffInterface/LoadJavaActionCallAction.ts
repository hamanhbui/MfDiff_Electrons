import * as $ from "./"
import diff = require("../DiffInterface")
import single = require("../SingleInterface")

/**
 * load two JavaActionCallActions to an IJavaActionCallActionDiff
 */
export function loadJavaActionCallAction(object1: single.IJavaActionCallAction, object2: single.IJavaActionCallAction): diff.IJavaActionCallActionDiff {
    return {
        typeName: single.ElementType.JavaActionCallAction,
        outputVariableName: $.loadToIBasicDiff(object1.outputVariableName, object2.outputVariableName),
        javaActionName: $.loadToIBasicDiff(object1.javaActionName, object2.javaActionName),
        // if two objects have the same JavaActionName, compare two parameter lists
        // if two objects have different JavaActionName, load two parameters into an IBasicDiff of IJavaActionParameter[]
        parameters:
        (object1.javaActionName === object2.javaActionName)
            ? $.loadArrayDiff(object1.parameters, object2.parameters,
                $.loadParameterDiff, $.compareTwoParametersById
            )
            : $.loadToIBasicDiff(object1.parameters, object2.parameters),
        // returnType: $.loadToIBasicDiff(
        //     object1.javaAction && getJavaActionReturnType(object1),
        //     object1.javaAction && getJavaActionReturnType(object2)
        // )
    }
}