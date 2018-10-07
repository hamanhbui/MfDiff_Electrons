/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const DeleteAtionItem = (props: { diff: Diff.IDeleteActionDiff, revNos: number[], showCommonInfo: boolean }) => {
    return (
        <div>
            {$.renderDiffContainer("Action", <div>
                {$.renderPairItem("Variable", props.diff.deleteVariableName, props.revNos, props.showCommonInfo)}
                {$.renderPairBooleanItem("Refresh in client", props.diff.refreshInClient, props.revNos, props.showCommonInfo)}
            </div>)}
        </div>
    )
}