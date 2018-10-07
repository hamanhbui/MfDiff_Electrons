import diff = require("../DiffInterface");
import single = require("../SingleInterface")

/**
 * load to IExclusiveMergeDiff
 */
export function loadExclusiveMerge(): diff.IExclusiveMergeDiff {
    return {
        typeName: single.ElementType.ExclusiveMerge
    }
}