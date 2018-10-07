import single = require("../SingleInterface");
import { microflows as mfs } from "mendixmodelsdk"

export function loadCommitAction(object: mfs.CommitAction): single.ICommitAction {
    return {
        isSingle: true,
        typeName: single.ElementType.CommitAction,
        commitVariableName: object.commitVariableName,
        refreshInClient: object.refreshInClient,
        withEvents: object.withEvents,
    }
}