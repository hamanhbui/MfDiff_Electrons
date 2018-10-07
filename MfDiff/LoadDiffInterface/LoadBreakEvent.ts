import diff = require("../DiffInterface");
import single = require("../SingleInterface")

/**
 * load IBreakEventDiff
 */
export function loadBreakEvent(): diff.IBreakEventDiff {
    return {
        typeName: single.ElementType.BreakEvent,
    }
}