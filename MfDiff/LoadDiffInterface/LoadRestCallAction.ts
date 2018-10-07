import * as $ from "./"
import diff = require("../DiffInterface")
import single = require("../SingleInterface")

export function loadRestCallAction(object1: single.IRestCallAction, object2: single.IRestCallAction): diff.IRestCallActionDiff {
    return {
        timeOut: (object1.timeout && object2.timeout) ? $.loadToIBasicDiff(object1.timeout, object2.timeout) : undefined,
        useRequestTimeOut: (object1.useRequestTimeOut && object2.useRequestTimeOut) ? $.loadToIBasicDiff(object1.useRequestTimeOut, object2.useRequestTimeOut) : undefined,
        typeName: single.ElementType.RestCallAction,
        requestHandling: $.loadRequestHandlingDiff(object1.requestHandling, object2.requestHandling),
        requestHandlingType: $.loadToIBasicDiff(object1.requestHandlingType, object2.requestHandlingType),
        httpConfiguration: $.loadHttpConfiguration(object1.httpConfiguration, object2.httpConfiguration),
        resultHandling: $.loadResultHandlingDiff(object1.resultHandling, object1.resultHandlingType, object2.resultHandling, object2.resultHandlingType),
    }
}