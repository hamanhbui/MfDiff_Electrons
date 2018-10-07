import * as $ from "./"
import diff = require("../DiffInterface")
import single = require("../SingleInterface")

export function loadFlow(object1: single.IFlow, object2: single.IFlow): diff.IFlowDiff {
    let output: diff.IFlowDiff
    output = $.loadSequenceFlow(object1, object2)
    output.originConnectionIndex = $.loadToIBasicDiff(object1.originConnectionIndex, object2.originConnectionIndex)
    output.destinationConnectionIndex = $.loadToIBasicDiff(object1.destinationConnectionIndex, object2.destinationConnectionIndex)
    return output
}