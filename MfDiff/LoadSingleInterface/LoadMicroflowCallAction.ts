import single = require("../SingleInterface");
import * as $ from "./"
//import { getTypeOfMfParameterObject } from "./LoadMicroflowParameterObject"
import { microflows as mfs } from "mendixmodelsdk"

export function convertMicroflowCallParameterToParameterMapping(object: mfs.MicroflowCallParameterMapping, listMfCpnBasicInfo: single.IMfCpnBasicInfo[]): single.IParameterMapping {
    let type: string = "";
    listMfCpnBasicInfo.forEach(element => {
        if (object.parameterQualifiedName === element.name) {
            type = element.type
        }
    })
    return {
        id: object.id,
        name: object.parameterQualifiedName,
        value: object.argument,
        type: type
    }
}

// export function getMicroflowParameterMapping(object: mfs.MicroflowCall): single.IParameterMapping[] {
//     let objectCollection = object && object.microflow && (object.microflow as mfs.Microflow).objectCollection;
//     let nameToValue: { [name: string]: string } = {};
//     object && object.parameterMappings && object.parameterMappings.map(element =>
//         nameToValue[element.parameterQualifiedName] = element.argument)
//     return objectCollection && objectCollection.objects && objectCollection.objects.filter(object => object instanceof mfs.MicroflowParameterObject)
//         .map(object => ({
//             id: object.id,
//             name: object.qualifiedName.split(".")[2],
//             type: getTypeOfMfParameterObject((object as mfs.MicroflowParameterObject).type),
//             value: nameToValue[object.qualifiedName]
//         }))
// }

export function loadMicroflowCallAction(object: mfs.MicroflowCallAction, listMfCpnBasicInfo: single.IMfCpnBasicInfo[]): single.IMicroflowCallAction {
    return {
        isSingle: true,
        typeName: single.ElementType.MicroflowCallAction,
        microflowCallName: object.microflowCall.microflowQualifiedName,
        outputVariableName: object.outputVariableName,
        useReturnVariable: object.useReturnVariable,
        parameters: object.microflowCall && object.microflowCall.parameterMappings.map(element => convertMicroflowCallParameterToParameterMapping(element, listMfCpnBasicInfo)),
        returnType: $.getReturnType(object.microflowCall.microflow && object.microflowCall.microflow.returnType),
    }
}