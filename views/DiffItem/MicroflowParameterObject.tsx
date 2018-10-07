/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const MicroflowParameterObjectItem = (props: { diff: Diff.IMicroflowParameterObjectDiff, revNos: number[], showCommonInfo: boolean }) => {
    return <div>
        {$.renderDiffContainer("Common", <div>
            {$.renderPairTextAreaItem("Documentation", props.diff.documentation, props.showCommonInfo)}
        </div>)}
        {$.renderDiffContainer("Output", <div>
            {$.renderPairItem("Data type", props.diff.type, props.revNos, props.showCommonInfo)}
            {$.renderPairItem("Name", props.diff.name, props.revNos, props.showCommonInfo)}
        </div>)}
    </div>
}