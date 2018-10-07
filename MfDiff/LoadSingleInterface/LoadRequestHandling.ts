import * as $ from "./"
import { microflows as mfs } from "mendixmodelsdk"
import single = require("../SingleInterface")

export function convertSimpleParameterToParameterMapping(object: mfs.WebServiceOperationSimpleParameterMapping): single.IParameterMapping {
    return {
        id: object.id,
        name: object.parameterPath.split("|")[1],
        value: object.argument
    }
}

export function convertAdvancedParamterToParameterMapping(object: mfs.WebServiceOperationAdvancedParameterMapping): single.IParameterMapping {
    return {
        id: object.id,
        name: object.parameterName,
        value: object.argument
    }
}

export function loadRequestHandling(object: mfs.RequestHandling): single.IRequestHandling {
    if (object instanceof mfs.SimpleRequestHandling) {
        return {
            typeName: "SimpleRequestHandling",
            nullValueOption: object.nullValueOption.name,
            paramterMappings: object.parameterMappings.map(element => $.loadParameter(convertSimpleParameterToParameterMapping(element))),
        } as single.ISimpleRequestHandling
    }
    if (object instanceof mfs.CustomRequestHandling) {
        return {
            typeName: "CustomRequestHandling",
            template: $.loadStringTemplate(object.template)
        } as single.ICustomRequestHandling
    }
    if (object instanceof mfs.MappingRequestHandling) {
        return {
            typeName: "MappingRequestHandling",
            mappingName: object.mappingQualifiedName,
            parameterName: object.mappingArgumentVariableName
        } as single.IMappingRequestHandling
    }
    if (object instanceof mfs.BinaryRequestHandling) {
        return {
            typeName: "BinaryRequestHandling",
            expression: object.expression
        } as single.IBinaryRequestHandling
    }
    let advanceObject = object as mfs.AdvancedRequestHandling
    return {
        typeName: "AdvancedRequestHandling",
        nullValueOption: advanceObject.nullValueOption.name,
        parameterMappings: advanceObject.parameterMappings.map(element => $.loadParameter(convertAdvancedParamterToParameterMapping(element))),
    } as single.IAdvancedRequestHandling
}
