import diff = require("../DiffInterface");
import single = require("../SingleInterface")

/**
 * load two ContinueEvents to an IContinueEventDiff
 */
export function loadContinueEvent(): diff.IContinueEventDiff {
    return {
        typeName: single.ElementType.ContinueEvent,
    }
}