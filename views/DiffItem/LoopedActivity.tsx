/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const LoopedActivityItem = (props: { diff: Diff.ILoopedActivity, revNos: number[], showCommonInfo: boolean }) => {
    return <div>
        {$.renderDiffContainer("Input", <div>
            {$.renderPairItem("Iterate over", props.diff.iteratedListVariableName, props.revNos, props.showCommonInfo)}
        </div>)}
        {$.renderDiffContainer("Action", <div>
            {$.renderPairItem("Name", props.diff.loopVariableName, props.revNos, props.showCommonInfo)}
        </div>)}
    </div>
}