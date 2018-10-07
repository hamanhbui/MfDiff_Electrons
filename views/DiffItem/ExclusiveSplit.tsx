/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import single = require("../../MfDiff/SingleInterface")
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export function getExclusiveSplitType(diff: Diff.IBasicDiff<single.ISplitCondition> | Diff.ISplitConditionDiff | undefined): Diff.IBasicDiff<string> {
    if (!diff) return "";
    if (diff.typeName === "ExpressionSplitConditionDiff") {
        return {
            isDiff: false,
            member1: "Expression",
            member2: "Expression",
        }
    } else if (diff.typeName === "RuleSplitConditionDiff") {
        return {
            isDiff: false,
            member1: "Rule",
            member2: "Rule",
        }
    }
    return {
        isDiff: true,
        member1: ((diff as Diff.IBasicDiff<single.ISplitCondition>).member1 as single.ISplitCondition).typeName.split("S")[0],
        member2: ((diff as Diff.IBasicDiff<single.ISplitCondition>).member2 as single.ISplitCondition).typeName.split("S")[0],
    }
}

export const ExclusiveSplitItem = (props: { diff: Diff.IExclusiveSplitDiff, revNos: number[], showCommonInfo: boolean }) => {
    if (!props.diff.splitCondition) return <span />
    return <div>
        {$.renderDiffContainer("Common", <div>
            {$.renderPairTextAreaItem("Caption", props.diff.caption, props.showCommonInfo)}
            {$.renderEnumItem("Exclusive split type", getExclusiveSplitType(props.diff.splitCondition), props.showCommonInfo, ["Expression", "Rule"])}
        </div>)}
        {(props.diff.splitCondition.typeName === "ExpressionSplitConditionDiff") ? <div>
            {$.renderDiffContainer("Expression", <div>
                {$.renderPairTextAreaItem("", (props.diff.splitCondition as Diff.IExpressionSplitConditionDiff).expression, props.showCommonInfo)}
            </div>)}
        </div> : (props.diff.splitCondition.typeName === "RuleSplitConditionDiff") ? <div>
            {$.renderDiffContainer("Rule", <div>
                {$.renderPairItem("Rule", (props.diff.splitCondition as Diff.IRuleDiff).ruleName, props.revNos, props.showCommonInfo)}
                {$.renderArrayItem("", (props.diff.splitCondition as Diff.IRuleDiff).parameters, props.revNos, props.showCommonInfo, new $.DisplayArrayItemOption(
                    $.ArrayType.Parameter, ["Name", "Type", "Argument"]
                ))}
            </div>)}
        </div> : <$.PairContainer>
                    {renderSingleSplitCondition((props.diff.splitCondition as Diff.IBasicDiff<single.ISplitCondition>).member1)}
                    {renderSingleSplitCondition((props.diff.splitCondition as Diff.IBasicDiff<single.ISplitCondition>).member2)}
                </$.PairContainer>}
    </div>
}

export function renderSingleSplitCondition(value: single.ISplitCondition | undefined) {
    if (!value) return undefined;
    if (value.typeName === "ExpressionSplitCondition") {
        return $.renderDiffContainer("Expression", <div>
            <$.SingleItem name="Expression" value={(value as single.IExpressionSplitCondition).expression} />
        </div>)
    }
    if (value.typeName === "RuleSplitCondition") {
        return $.renderDiffContainer("Rule", <div>
            <$.SingleItem name="Rule" value={(value as single.IRuleSplitCondition).ruleName} />
            {$.renderArrayItem("", (value as single.IRuleSplitCondition).parameters, [], true, new $.DisplayArrayItemOption(
                $.ArrayType.Parameter, ["Name", "Type", "Argument"]
            ))}
        </div>)
    }
}