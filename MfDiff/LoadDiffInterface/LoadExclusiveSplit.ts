import diff = require("../DiffInterface");
import single = require("../SingleInterface")
import * as $ from "./"

export function loadSplitConditionDiff(object1: single.ISplitCondition, object2: single.ISplitCondition): diff.ISplitConditionDiff | diff.IBasicDiff<single.ISplitCondition> {
    if (object1.typeName === object2.typeName) {
        if (object1.typeName === "ExpressionSplitCondition") {
            return {
                typeName: "ExpressionSplitConditionDiff",
                expression: $.loadToIBasicDiff((object1 as single.IExpressionSplitCondition).expression, (object2 as single.IExpressionSplitCondition).expression)
            } as diff.IExpressionSplitConditionDiff
        }
        if (object1.typeName === "RuleSplitCondition") {
            let ruleObject1 = object1 as single.IRuleSplitCondition
            let ruleObject2 = object2 as single.IRuleSplitCondition
            return {
                typeName: "RuleSplitConditionDiff",
                ruleName: $.loadToIBasicDiff(ruleObject1.ruleName, ruleObject2.ruleName),
                parameters:
                (ruleObject1.ruleName === ruleObject2.ruleName) ?
                    $.loadArrayDiff(ruleObject1.parameters, ruleObject2.parameters,
                        $.loadParameterDiff, $.compareTwoParametersById
                    ) :
                    $.loadToIBasicDiff(ruleObject1.parameters, ruleObject2.parameters)
            } as diff.IRuleDiff
        }
    }
    return $.loadToIBasicDiff(object1, object2)
}

export function loadExclusiveSplit(object1: single.IExclusiveSplit, object2: single.IExclusiveSplit): diff.IExclusiveSplitDiff {
    return {
        typeName: single.ElementType.ExclusiveSplit,
        caption: $.loadToIBasicDiff(object1.caption, object2.caption),
        splitCondition: loadSplitConditionDiff(object1.splitCondition, object2.splitCondition)
    }
}
