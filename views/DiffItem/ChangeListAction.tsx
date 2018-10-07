/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const ChangeListActionItem = (props: { diff: Diff.IChangeListActionDiff, revNos: number[], showCommonInfo: boolean }) => {
    return (
        <div>
            {$.renderDiffContainer("List", <div>{$.renderPairItem("Variable Name", props.diff.changeVariableName, props.revNos, props.showCommonInfo)}</div>)}
            {$.renderDiffContainer("Type", <div>{$.renderEnumItem("Type", props.diff.type, props.showCommonInfo, ["Add", "Remove", "Clear", "Replace"])}</div>)}
            {$.renderDiffContainer("Value", <div>{$.renderPairTextAreaItem("", props.diff.value, props.showCommonInfo)}</div>)}
        </div>
    )
}
