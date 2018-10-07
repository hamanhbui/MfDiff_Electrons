import { microflows as mfs } from "mendixmodelsdk"
import * as $ from "./"
import single = require("../SingleInterface")

export function loadSingleInterface(object: mfs.Flow | mfs.MicroflowObject | single.IProperty, listMfCpnBasicInfo: single.IMfCpnBasicInfo[]): single.IMfElementBase {
    let output: single.IMfElementBase;
    if (object instanceof mfs.Flow) {
        output = $.loadFlow(object)
        output.id = object.id
    }
    else if (object instanceof mfs.MicroflowObject) {
        output = $.loadMfObject(object as mfs.MicroflowObject, listMfCpnBasicInfo)
        output.id = object.id
    }
    else {
        let objectProperty = object as single.IProperty;
        let outputProperty: single.IProperty = {
            name: objectProperty.name,
            errorMessage: objectProperty.errorMessage,
            id: objectProperty.id,
            allowConcurrentExecution: objectProperty.allowConcurrentExecution,
            errorMicroflow: objectProperty.errorMicroflow,
            applyEntityAccess: objectProperty.applyEntityAccess,
            documentation: objectProperty.documentation,
            returnType: objectProperty.returnType,
            allowedModuleRolesQualifiedNames: objectProperty.allowedModuleRolesQualifiedNames,
            markAsUsed: objectProperty.markAsUsed,
            typeName: single.ElementType.Property,
            isSingle: true
        }
        output = outputProperty
    }
    return output;
}