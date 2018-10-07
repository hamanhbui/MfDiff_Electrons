import diff = require("../DiffInterface")
import single = require("../SingleInterface")

/**
 * load StartEvent
 */
export function loadStartEvent(): diff.IStartEventDiff {
    return {
        typeName: single.ElementType.StartEvent
    }
}