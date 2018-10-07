/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const ValidationFeedbackActionItem = (props: { diff: Diff.IValidationFeedbackActionDiff, revNos: number[], showCommonInfo: boolean }) => (
    <div>
        {$.renderDiffContainer("Action", <div>
            {$.renderPairItem("Variable", props.diff.objectVariableName, props.revNos, props.showCommonInfo)}
            {$.renderPairItem("Member", props.diff.memberName, props.revNos, props.showCommonInfo)}
            {$.renderTemplate(props.diff.feedBackTemplate, props.revNos, props.showCommonInfo)}
        </div>)}
    </div>
)