import { microflows as mfs } from "mendixmodelsdk"
import single = require("../SingleInterface");
import * as $ from "./"

/**
 * load two ShowMessageActions to an IShowMessageActionDiff
 */
export function LoadShowMessageAction(object: mfs.ShowMessageAction): single.IShowMessageAction {
    return {
        isSingle: true,
        typeName: single.ElementType.ShowMessageAction,
        type: object.type && object.type.name,
        blocking: object.blocking,
        template: $.loadTextTemplate(object.template)
    }
}