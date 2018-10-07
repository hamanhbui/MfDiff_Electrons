/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const ShowPageActionItem = (props: { diff: Diff.IShowPageActionDiff, revNos: number[], showCommonInfo: boolean }) => {
    return <div>
        {$.renderDiffContainer("Input", <div>
            {$.renderPairItem("Object to pass", props.diff.passedObjectVariableName, props.revNos, props.showCommonInfo)}
        </div>)}
        {$.renderDiffContainer("Action", <div>
            {$.renderPairItem("Page", props.diff.pageName, props.revNos, props.showCommonInfo)}
            {$.renderPairCheckBox("Page title", "Override page title", props.diff.pageTitle, props.diff.overridePageTitle, props.revNos, props.showCommonInfo)}
        </div>)}
    </div>
}