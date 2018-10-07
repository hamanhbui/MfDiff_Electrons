/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const CastActionItem = (props: { diff: Diff.ICastActionDiff, revNos: number[], showCommonInfo: boolean }) => {
    return (
        <div>
            {$.renderDiffContainer("Output", <div>{$.renderPairItem("Variable", props.diff.outputVariableName, props.revNos, props.showCommonInfo)}</div>)}
        </div>
    )
}