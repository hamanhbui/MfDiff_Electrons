/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const AggregateListActionItem = (props: { diff: Diff.IAggregateListActionDiff, revNos: number[], showCommonInfo: boolean }) => {
    return (
        <div>
            {$.renderDiffContainer("Input", <div>{$.renderPairItem("Variable", props.diff.inputListVariableName, props.revNos, props.showCommonInfo)}</div>)}
            {$.renderDiffContainer("Action", <div>
                {$.renderPairItem("Function", props.diff.aggregateFunction, props.revNos, props.showCommonInfo)}
                {$.renderPairItem("Attribute", props.diff.attributeName, props.revNos, props.showCommonInfo)}
            </div>)}
            {$.renderDiffContainer("Output", <div>{$.renderPairItem("Variable", props.diff.outputVariableName, props.revNos, props.showCommonInfo)}</div>)}
        </div>
    )
}