import diff = require("../DiffInterface");
import * as $ from "./"
import single = require('../SingleInterface')

export function loadMicroflowCallAction(object1: single.IMicroflowCallAction, object2: single.IMicroflowCallAction): diff.IMicroflowCallActionDiff {
    return {
        typeName: single.ElementType.MicroflowCallAction,
        microflowCallName: $.loadToIBasicDiff(object1.microflowCallName, object2.microflowCallName),
        outputVariableName: $.loadToIBasicDiff(object1.outputVariableName, object2.outputVariableName),
        useReturnVariable: $.loadToIBasicDiff(object1.useReturnVariable, object2.useReturnVariable),
        parameters: (object1.microflowCallName === object2.microflowCallName) ?
            $.loadArrayDiff(object1.parameters, object2.parameters,
                $.loadParameterDiff, $.compareTwoParametersById
            )
            : $.loadToIBasicDiff(object1.parameters, object2.parameters),
        returnType: $.loadToIBasicDiff(object1.returnType, object2.returnType)
    }
}