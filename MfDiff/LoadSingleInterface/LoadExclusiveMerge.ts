import single = require("../SingleInterface");

/**
 * load to IExclusiveMergeDiff
 */
export function loadExclusiveMerge(): single.IExclusiveMerge {
    return {
        isSingle: true,
        typeName: single.ElementType.ExclusiveMerge
    }
}