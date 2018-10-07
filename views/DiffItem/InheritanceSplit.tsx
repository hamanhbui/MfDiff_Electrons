/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const InheritanceSplitItem = (props: { diff: Diff.IInheritanceSplitDiff, revNos: number[], showCommonInfo: boolean }) => {
    return <div>
        {$.renderDiffContainer("Common", <div>
            {$.renderPairTextAreaItem("Caption", props.diff.caption, props.showCommonInfo)}
        </div>)}
        {$.renderDiffContainer("Input", <div>
            {$.renderPairItem("Variable", props.diff.splitVariableName, props.revNos, props.showCommonInfo)}
        </div>)}
    </div>
}