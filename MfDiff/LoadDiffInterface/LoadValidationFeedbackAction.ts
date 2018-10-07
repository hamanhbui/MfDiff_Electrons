import diff = require("../DiffInterface");
import * as $ from "./"
import single = require("../SingleInterface")

export function loadValidationFeedbackAction(object1: single.IValidationFeedbackAction, object2: single.IValidationFeedbackAction): diff.IValidationFeedbackActionDiff {
    return {
        typeName: single.ElementType.ValidationFeedbackAction,
        objectVariableName: $.loadToIBasicDiff(object1.objectVariableName, object2.objectVariableName),
        memberName: $.loadToIBasicDiff(object1.memberName, object2.memberName),
        feedBackTemplate: $.loadTextTemplateDiff(object1.feedbackTemplate, object2.feedbackTemplate)
    }
}