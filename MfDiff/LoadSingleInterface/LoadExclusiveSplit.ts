import { microflows as mfs } from "mendixmodelsdk"
import single = require("../SingleInterface");
import * as $ from "./"

export function convertRuleParameterToParameterMapping(object: mfs.RuleCallParameterMapping): $.IParameterMapping {
    return {
        id: (object.parameter) ? object.parameter.id : object.id,
        name: object.parameterQualifiedName.split(".")[2],
        value: object.argument,
        type: object.parameter && object.parameter.type
    }
}

export function loadSplitCondition(object: mfs.SplitCondition): single.ISplitCondition {
    if (object instanceof mfs.RuleSplitCondition) {
        return {
            typeName: "RuleSplitCondition",
            ruleName: object.ruleCall.ruleQualifiedName,
            parameters: $.loadParameterList(object.ruleCall.parameterMappings.map(element => convertRuleParameterToParameterMapping(element)))
        } as single.IRuleSplitCondition
    } else {
        return {
            typeName: "ExpressionSplitCondition",
            expression: (object as mfs.ExpressionSplitCondition).expression,
        } as single.IExpressionSplitCondition
    }
}

export function loadExclusiveSplit(object: mfs.ExclusiveSplit): single.IExclusiveSplit {
    return {
        isSingle: true,
        typeName: single.ElementType.ExclusiveSplit,
        caption: object.caption,
        splitCondition: loadSplitCondition(object.splitCondition)
    }
}
