/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const SequenceFlowItem = (props: { diff: Diff.ISequenceFlowDiff, revNos: number[], showCommonInfo }) => {
    return <div>
        {$.renderDiffContainer("Value", <div>
            {$.renderPairItem("Case value", props.diff.caseValue, props.revNos, props.showCommonInfo)}
        </div>)}
    </div>
}