import single = require("../SingleInterface");
import { microflows as mfs } from "mendixmodelsdk"

/**
 * load two DeleteActions to an IDeleteActionDiff
 */
export function loadDeleteAction(object: mfs.DeleteAction): single.IDeleteAction {
    return {
        isSingle: true,
        typeName: single.ElementType.DeleteAction,
        deleteVariableName: object.deleteVariableName,
        refreshInClient: object.refreshInClient,
    }
}