import * as $ from "./"
import diff = require("../DiffInterface")
import single = require("../SingleInterface")

export function loadDiffInterface(object1: single.IMfElementBase, object2: single.IMfElementBase): diff.IMfElementDiffBase {
    if (object1.typeName.name.includes("Flow")) {
        return $.loadFlow(object1, object2)
    }
    else if (object1.typeName === single.ElementType.Property) {
        let objProperty1 = object1 as single.IProperty;
        let objProperty2 = object2 as single.IProperty;
        let output: diff.IProperty = {
            name: $.loadToIBasicDiff(objProperty1.name, objProperty2.name),
            errorMessage: $.loadToIBasicDiff(objProperty1.errorMessage, objProperty2.errorMessage),
            allowConcurrentExecution: $.loadToIBasicDiff(objProperty1.allowConcurrentExecution, objProperty2.allowConcurrentExecution),
            errorMicroflow: $.loadToIBasicDiff(objProperty1.errorMicroflow, objProperty2.errorMicroflow),
            applyEntityAccess: $.loadToIBasicDiff(objProperty1.applyEntityAccess, objProperty2.applyEntityAccess),
            documentation: $.loadToIBasicDiff(objProperty1.documentation, objProperty2.documentation),
            markAsUsed: $.loadToIBasicDiff(objProperty1.markAsUsed, objProperty2.markAsUsed),
            allowedModuleRolesQualifiedNames: $.loadToIBasicDiff(objProperty1.allowedModuleRolesQualifiedNames, objProperty2.allowedModuleRolesQualifiedNames),
            typeName: object1.typeName,
            returnType: $.loadToIBasicDiff(objProperty1.returnType, objProperty2.returnType),
        };
        return output;
    }
    return $.loadMfObject(object1, object2)
}