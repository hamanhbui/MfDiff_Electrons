import single = require("../SingleInterface");

/**
 * load two ContinueEvents to an IContinueEventDiff
 */
export function loadContinueEvent(): single.IContinueEvent {
    return {
        isSingle: true,
        typeName: single.ElementType.ContinueEvent,
    }
}