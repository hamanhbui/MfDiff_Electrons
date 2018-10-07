import * as $ from "./"
import { microflows as mfs } from "mendixmodelsdk"
import single = require("../SingleInterface")

export function loadRestCallAction(object: mfs.RestCallAction): single.IRestCallAction {
    return {
        timeout: loadTimeOut(object),
        useRequestTimeOut: loadUseRequestTimeOut(object),
        isSingle: true,
        typeName: single.ElementType.RestCallAction,
        requestHandling: $.loadRequestHandling(object.requestHandling),
        requestHandlingType: object.requestHandlingType.name,
        httpConfiguration: $.loadHttpConfiguration(object.httpConfiguration),
        resultHandling: $.loadResultHandling(object.resultHandling, object.resultHandlingType),
        resultHandlingType: object.resultHandlingType.name
    }
}
function loadTimeOut(object: mfs.RestCallAction): number | undefined {
    try {
        return object.timeOut
    } catch (e) {
        console.log(e);
    }
}
function loadUseRequestTimeOut(object: mfs.RestCallAction): boolean | undefined {
    try {
        return object.useRequestTimeOut
    } catch (e) {
        console.log(e);
    }
}