import * as $ from "./"
import { microflows as mfs } from "mendixmodelsdk"
import single = require("../SingleInterface")

export function loadWebServiceCallAction(object: mfs.WebServiceCallAction): single.IWebServiceCallAction {
    return {
        isSingle: true,
        typeName: single.ElementType.WebServiceCallAction,
        httpConfiguration: $.loadHttpConfiguration(object.httpConfiguration),
        isValidationRequired: object.isValidationRequired,
        operationName: object.operationName,
        requestBodyHandling: $.loadRequestHandling(object.requestBodyHandling),
        requestHeaderHandling: $.loadRequestHandling(object.requestHeaderHandling),
        resultHandling: $.loadResultHandling(object.resultHandling, undefined),
        //sendNullValueChoiceDiff: object1.sendNullValueChoice.name, object2.sendNullValueChoice.name),
        timeOut: object.timeOut,
        useRequestTimeOut: object.useRequestTimeOut,
    }
}