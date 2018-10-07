import single = require("../SingleInterface");
import { microflows as mfs } from "mendixmodelsdk"

/**
 * load two CastAction to an ICastActionDiff
 */
export function loadCastAction(object: mfs.CastAction): single.ICastAction {
    return {
        isSingle: true,
        typeName: single.ElementType.CastAction,
        outputVariableName: object.outputVariableName
    }
}