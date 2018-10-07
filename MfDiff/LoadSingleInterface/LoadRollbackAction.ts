import single = require("../SingleInterface");
import { microflows as mfs } from "mendixmodelsdk"

/**
 * load two RollbackActions to an IRollbackActionDiff
 */
export function loadRollbackAction(object: mfs.RollbackAction): single.IRollbackAction {
    return {
        isSingle: true,
        typeName: single.ElementType.RollbackAction,
        rollbackVariableName: object.rollbackVariableName,
        refreshInClient: object.refreshInClient,
    }
}