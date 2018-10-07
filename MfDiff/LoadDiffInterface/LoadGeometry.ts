import diff = require("../DiffInterface")
import single = require("../SingleInterface")
import * as $ from "./"

/**
 * load two IPoints to an IPointDiff
 */
export function loadToIPositionDiff(first: single.IPoint, second: single.IPoint): diff.IPointDiff {
    return {
        x: $.loadToIBasicDiff(first.x, second.x),
        y: $.loadToIBasicDiff(first.y, second.y)
    }
}

/**
 * load two ISize to an ISizeDiff
 */
export function loadToISizeDiff(first: single.ISize, second: single.ISize): diff.ISizeDiff {
    return {
        height: $.loadToIBasicDiff(first.height, second.height),
        width: $.loadToIBasicDiff(first.width, second.width)
    }
}