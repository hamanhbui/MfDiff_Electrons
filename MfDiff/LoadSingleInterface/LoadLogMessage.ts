import { microflows as mfs } from "mendixmodelsdk"
import single = require("../SingleInterface");
import * as $ from "./"

export function loadLogMessage(object: mfs.LogMessageAction): single.ILogMessageAction {
    return {
        isSingle: true,
        typeName: single.ElementType.LogMessageAction,
        level: object.level.name,
        messageTemplate: $.loadStringTemplate(object.messageTemplate),
        nodeName: object.node,
        includeLatestStackTrace: object.includeLatestStackTrace
    }
}