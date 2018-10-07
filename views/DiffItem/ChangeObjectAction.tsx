/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const ChangeObjectActionItem = (props: { diff: Diff.IChangeObjectActionDiff, revNos: number[], showCommonInfo: boolean }) => {
    return (
        <div>
            {$.renderDiffContainer("Input", <div>{$.renderPairItem("Variable", props.diff.changeVariableName, props.revNos, props.showCommonInfo)}</div>)}
            {$.renderDiffContainer("Action", <div>
                {$.renderEnumItem("Commit", props.diff.commit, props.showCommonInfo, ["Yes", "Yes without events", "No"])}
                {$.renderPairBooleanItem("Refresh In Client", props.diff.refreshInClient, props.revNos, props.showCommonInfo)}
                {$.renderArrayItem("", props.diff.items, props.revNos, props.showCommonInfo, new $.DisplayArrayItemOption(
                    $.ArrayType.MemberChange, ["Member", "Member type", "Type", "Value"]
                ))}
            </div>)}
        </div>
    )
}