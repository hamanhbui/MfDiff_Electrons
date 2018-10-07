/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const EndEventItem = (props: { diff: Diff.IEndEventDiff, revNos: number[], showCommonInfo: boolean }) => (
    <div>
        {$.renderDiffContainer("Microflow return type", <div>
            {$.renderPairItem("Type", props.diff.returnType, props.revNos, props.showCommonInfo)}
        </div>)}
        {$.renderDiffContainer("Return value", <div>
            {$.renderPairTextAreaItem("", props.diff.returnValue, props.showCommonInfo)}
        </div>)}
    </div>
)