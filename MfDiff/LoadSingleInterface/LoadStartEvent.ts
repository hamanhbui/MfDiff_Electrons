import single = require("../SingleInterface")

/**
 * load StartEvent
 */
export function loadStartEvent(): single.IStartEvent {
    return {
        isSingle: true,
        typeName: single.ElementType.StartEvent
    }
}