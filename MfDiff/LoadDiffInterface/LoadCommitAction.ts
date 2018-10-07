import diff = require("../DiffInterface");
import single = require("../SingleInterface")
import * as $ from "./"

export function loadCommitAction(object1: single.ICommitAction, object2: single.ICommitAction): diff.ICommitActionDiff {
    return {
        isDiff: false,
        typeName: single.ElementType.CommitAction,
        commitVariableName: $.loadToIBasicDiff(object1.commitVariableName, object2.commitVariableName),
        refreshInClient: $.loadToIBasicDiff(object1.refreshInClient, object2.refreshInClient),
        withEvents: $.loadToIBasicDiff(object1.withEvents, object2.withEvents)
    }
}