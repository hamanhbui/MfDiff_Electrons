import * as $ from "./"
import diff = require("../DiffInterface")
import single = require("../SingleInterface")

export function loadRequestHandlingDiff(object1: single.IRequestHandling, object2: single.IRequestHandling): diff.IRequestHandlingDiff | diff.IBasicDiff<single.IRequestHandling> {
    if (object1.typeName === object2.typeName) {
        if (object1.typeName === "SimpleRequestHandling") {
            let simpleObject1 = object1 as single.ISimpleRequestHandling
            let simpleObject2 = object2 as single.ISimpleRequestHandling
            return {
                typeName: "SimpleRequestHandlingDiff",
                nullValueOption: $.loadToIBasicDiff(simpleObject1.nullValueOption, simpleObject2.nullValueOption),
                paramterMappings: $.loadArrayDiff(
                    simpleObject1.paramterMappings, simpleObject2.paramterMappings,
                    $.loadParameterDiff, $.compareTwoParametersById
                )
            } as diff.ISimpleRequestHandlingDiff
        }
        if (object1.typeName === "CustomRequestHandling") {
            return {
                typeName: "CustomRequestHandlingDiff",
                template: $.loadStringTemplateDiff((object1 as single.ICustomRequestHandling).template, (object2 as single.ICustomRequestHandling).template),
            } as diff.ICustomRequestHandlingDiff
        }
        if (object1.typeName === "MappingRequestHandling") {
            let mappingObject1 = object1 as single.IMappingRequestHandling
            let mappingObject2 = object2 as single.IMappingRequestHandling
            return {
                typeName: "MappingRequestHandlingDiff",
                mappingName: $.loadToIBasicDiff(mappingObject1.mappingName, mappingObject2.mappingName),
                parameterName: $.loadToIBasicDiff(mappingObject1.parameterName, mappingObject2.parameterName)
            } as diff.IMappingRequestHandlingDiff
        }
        if (object1.typeName === "BinaryRequestHandling") {
            return {
                typeName: "BinaryRequestHandlingDiff",
                expression: $.loadToIBasicDiff((object1 as single.IBinaryRequestHandling).expression, (object2 as single.IBinaryRequestHandling).expression)
            } as diff.IBinaryRequestHandlingDiff
        }
        if (object1.typeName === "AdvancedRequestHandling") {
            let advancedObject1 = object1 as single.IAdvancedRequestHandling
            let advancedObject2 = object2 as single.IAdvancedRequestHandling
            return {
                typeName: "AdvancedRequestHandlingDiff",
                nullValueOption: $.loadToIBasicDiff(advancedObject1.nullValueOption, advancedObject2.nullValueOption),
                parameterMappings: $.loadArrayDiff(
                    advancedObject1.parameterMappings, advancedObject2.parameterMappings,
                    $.loadParameterDiff, $.compareTwoParametersById
                )
            } as diff.IAdvancedRequestHandlingDiff
        }
    }
    return $.loadToIBasicDiff(object1, object2)
}