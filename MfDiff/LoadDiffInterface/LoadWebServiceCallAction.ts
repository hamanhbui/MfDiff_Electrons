import * as $ from "./"
import diff = require("../DiffInterface")
import single = require("../SingleInterface")

export function loadWebServiceCallAction(object1: single.IWebServiceCallAction, object2: single.IWebServiceCallAction): diff.IWebServiceCallActionDiff {
    return {
        typeName: single.ElementType.WebServiceCallAction,
        httpConfiguration: $.loadHttpConfiguration(object1.httpConfiguration, object2.httpConfiguration),
        isValidationRequired: $.loadToIBasicDiff(object1.isValidationRequired, object2.isValidationRequired),
        operationName: $.loadToIBasicDiff(object1.operationName, object2.operationName),
        requestBodyHandling: $.loadRequestHandlingDiff(object1.requestBodyHandling, object2.requestBodyHandling),
        requestHeaderHandling: $.loadRequestHandlingDiff(object1.requestHeaderHandling, object2.requestHeaderHandling),
        resultHandling: $.loadResultHandlingDiff(object1.resultHandling, "", object2.resultHandling, ""),
        //sendNullValueChoiceDiff: $.loadToIBasicDiff(object1.sendNullValueChoice.name, object2.sendNullValueChoice.name),
        timeOut: $.loadToIBasicDiff(object1.timeOut, object2.timeOut),
        useRequestTimeOut: $.loadToIBasicDiff(object1.useRequestTimeOut, object2.useRequestTimeOut)
    }
}