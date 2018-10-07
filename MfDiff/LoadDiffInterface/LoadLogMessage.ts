import diff = require("../DiffInterface");
import single = require("../SingleInterface")
import * as $ from "./"

export function loadLogMessage(object1: single.ILogMessageAction, object2: single.ILogMessageAction): diff.ILogMessageActionDiff {
    return {
        typeName: single.ElementType.LogMessageAction,
        level: $.loadToIBasicDiff(object1.level, object2.level),
        messageTemplate: $.loadStringTemplateDiff(object1.messageTemplate, object2.messageTemplate),
        nodeName: $.loadToIBasicDiff(object1.nodeName, object2.nodeName),
        includeLatestStackTrace: $.loadToIBasicDiff(object1.includeLatestStackTrace, object2.includeLatestStackTrace)
    }
}