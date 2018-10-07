import diff = require("../DiffInterface");
import single = require("../SingleInterface")

export function loadShowHomePageAction(): diff.IShowHomePageActionDiff {
    return {
        typeName: single.ElementType.ShowHomePageAction
    }
}