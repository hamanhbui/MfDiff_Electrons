import { convertGeometry } from "./convertGeometry";
import _cpnInterface = require("../interfaces");
import { microflows } from "mendixmodelsdk";
import _cpnTypeEnum = require("../interfaces/TypeEnum");
import { common } from "mendixmodelsdk";
export function convertValidationFeedbackAction(objectInfo: _cpnInterface.microflow.IObjectDict, mfObj: microflows.ActionActivity, validationFeedbackAction: microflows.ValidationFeedbackAction, point?: common.IPoint | undefined, size?: common.ISize | undefined): _cpnInterface.microflow.IValidationFeedbackAction {
    let cpnValidationFeedbackAction: _cpnInterface.microflow.IValidationFeedbackAction = {
        geometry: convertGeometry(validationFeedbackAction.containerAsActionActivity.relativeMiddlePoint, validationFeedbackAction.containerAsActionActivity.size, 1 / 2),
        caption: validationFeedbackAction.containerAsActionActivity.caption,
        type: _cpnTypeEnum.TypeEnum.ValidationFeedbackAction,
        id: validationFeedbackAction.containerAsActionActivity.id,
        errorHandlingType: validationFeedbackAction.errorHandlingType.name,
        backgroundColor: mfObj.backgroundColor.name
    }
    if (point != undefined && size != undefined) {
        let cpnLoopedGeometry: _cpnInterface.microflow.ILoopedActivity = {
            geometry: convertGeometry(point, size, 1 / 2)
        }
        cpnValidationFeedbackAction.geometry.left += cpnLoopedGeometry.geometry.left;
        cpnValidationFeedbackAction.geometry.top += cpnLoopedGeometry.geometry.top;
    }
    if (validationFeedbackAction.containerAsActionActivity.autoGenerateCaption === true) {
        if (validationFeedbackAction.attributeQualifiedName) {
            cpnValidationFeedbackAction.caption = "Show validation message on member '" + validationFeedbackAction.attributeQualifiedName.split(".")[2] + "' of " + validationFeedbackAction.objectVariableName;
        } else if (validationFeedbackAction.associationQualifiedName) {
            cpnValidationFeedbackAction.caption = "Show validation message on member '" + validationFeedbackAction.associationQualifiedName.split(".")[1] + "' of " + validationFeedbackAction.objectVariableName;
        }
    }
    if (cpnValidationFeedbackAction.id) {
        objectInfo[cpnValidationFeedbackAction.id] = {
            caption: cpnValidationFeedbackAction.caption,
        }
    }
    return cpnValidationFeedbackAction;
}