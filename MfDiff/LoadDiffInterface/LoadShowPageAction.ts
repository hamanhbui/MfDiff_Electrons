import diff = require("../DiffInterface");
import * as $ from "./"
import single = require("../SingleInterface")

/**
 * load two ShowPageActions to an IShowPageActionDiff
 */
export function loadShowPageAction(object1: single.IShowPageAction, object2: single.IShowPageAction): diff.IShowPageActionDiff {
    return {
        typeName: single.ElementType.ShowPageAction,
        passedObjectVariableName: $.loadToIBasicDiff(object1.passedObjectVariableName, object2.passedObjectVariableName),
        pageName: $.loadToIBasicDiff(object1.pageName, object2.pageName),
        pageTitle: $.loadToIBasicDiff(object1.pageTitle, object2.pageTitle),
        overridePageTitle: $.loadToIBasicDiff(object1.overridePageTitle, object2.overridePageTitle)
    }
}