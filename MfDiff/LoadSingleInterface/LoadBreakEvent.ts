import single = require("../SingleInterface");

/**
 * load IBreakEventDiff
 */
export function loadBreakEvent(): single.IBreakEvent {
    return {
        isSingle: true,
        typeName: single.ElementType.BreakEvent,
    }
}