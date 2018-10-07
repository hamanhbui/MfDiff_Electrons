import * as $ from "./"
import diff = require("../DiffInterface")
import single = require("../SingleInterface")

export function compareTwoParametersByName(first: single.IAttribute, second: single.IAttribute): number {
    if (first.name > second.name) return 1;
    if (first.name === second.name) return 0;
    return -1;
}

export function loadTextTemplateDiff(object1: single.ITemplate, object2: single.ITemplate): diff.ITemplateDiff {
    return {
        text: $.loadToIBasicDiff(object1.text, object2.text),
        parameters: $.loadArrayDiff(object1.parameters, object2.parameters,
            $.loadParameterDiff, compareTwoParametersByName
        )
    }
}

export function loadStringTemplateDiff(object1: single.ITemplate, object2: single.ITemplate): diff.ITemplateDiff {
    return {
        text: $.loadToIBasicDiff(object1.text, object2.text),
        parameters: $.loadArrayDiff(object1.parameters, object2.parameters,
            $.loadParameterDiff, compareTwoParametersByName
        )
    }
}
