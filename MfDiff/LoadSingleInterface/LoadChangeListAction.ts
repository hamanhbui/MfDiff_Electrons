import single = require("../SingleInterface");
import { microflows as mfs } from "mendixmodelsdk"

/**
 * load two ChangeListAction to an IChangeListActionDiff
 */
export function loadChangeListAction(object: mfs.ChangeListAction): single.IChangeListAction {
    return {
        isSingle: true,
        typeName: single.ElementType.ChangeListAction,
        changeVariableName: object.changeVariableName,
        type: object.type.name === "Set" ? "Replace" : object.type.name,
        value: object.value,
    }
}