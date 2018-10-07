import single = require("../SingleInterface");
import * as $ from "./"
import { microflows as mfs } from "mendixmodelsdk"

export function loadValidationFeedbackAction(object: mfs.ValidationFeedbackAction, listMfCpnBasicInfo: single.IMfCpnBasicInfo[]): single.IValidationFeedbackAction {
    let objectVariableName: string = object.objectVariableName;
    listMfCpnBasicInfo.forEach(element => {
        if (object.objectVariableName === element.name) {
            objectVariableName += " (" + element.type + ")";
        }
    })
    return {
        isSingle: true,
        typeName: single.ElementType.ValidationFeedbackAction,
        objectVariableName: objectVariableName,
        memberName: (object.associationQualifiedName !== "") ? object.associationQualifiedName : object.attributeQualifiedName,
        feedbackTemplate: $.loadTextTemplate(object.feedbackTemplate),
    }
}