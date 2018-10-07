import single = require("../SingleInterface");
import { microflows as mfs } from "mendixmodelsdk"

/**
 * load two ShowPageActions to an IShowPageActionDiff
 */
export function loadShowPageAction(object: mfs.ShowPageAction): single.IShowPageAction {
    return {
        isSingle: true,
        typeName: single.ElementType.ShowPageAction,
        passedObjectVariableName: object.passedObjectVariableName,
        pageName: object.pageSettings.pageQualifiedName,
        pageTitle: (object.pageSettings.formTitle) ? (object.pageSettings.formTitle.translations[0] ? object.pageSettings.formTitle.translations[0].text : undefined) : (object.pageSettings.page ? object.pageSettings.page.name : undefined),
        overridePageTitle: !!object.pageSettings.formTitle
    }
}