import diff = require("../DiffInterface");
import * as $ from "./"
import single = require("../SingleInterface")

/**
 * load two ShowMessageActions to an IShowMessageActionDiff
 */
export function LoadShowMessageAction(object1: single.IShowMessageAction, object2: single.IShowMessageAction): diff.IShowMessageActionDiff {
    return {
        typeName: single.ElementType.ShowMessageAction,
        type: $.loadToIBasicDiff(object1.type, object2.type),
        blocking: $.loadToIBasicDiff(object1.blocking, object2.blocking),
        template: $.loadTextTemplateDiff(object1.template, object2.template)
    }
}