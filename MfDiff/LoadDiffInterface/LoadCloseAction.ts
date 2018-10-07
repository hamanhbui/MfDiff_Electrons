import diff = require("../DiffInterface");
import single = require("../SingleInterface")

/**
 * load two CloseFormActions to an ICloseActionDiff
 */
export function loadCloseAction(): diff.ICloseActionDiff {
    return {
        typeName: single.ElementType.CloseAction,
    }
}