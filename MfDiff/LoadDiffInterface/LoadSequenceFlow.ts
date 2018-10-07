import * as $ from "./"
import { ISequenceFlowDiff } from "../DiffInterface"
import{ElementType} from "../SingleInterface"
import single = require("../SingleInterface")

export function loadSequenceFlow(object1: single.ISequenceFlow, object2: single.ISequenceFlow): ISequenceFlowDiff {
    return {
        typeName: ElementType.SequenceFlow,
        caseValue: $.loadToIBasicDiff(object1.caseValue, object2.caseValue)
    }
}