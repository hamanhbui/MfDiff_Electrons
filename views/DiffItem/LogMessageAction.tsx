/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const LogMessageActionItem = (props: { diff: Diff.ILogMessageActionDiff, revNos: number[], showCommonInfo: boolean }) => (
    <div>
        {$.renderDiffContainer("Action", <div>
            {$.renderPairItem("Log level", props.diff.level, props.revNos, props.showCommonInfo)}
            {$.renderPairItem("Log node name", props.diff.nodeName, props.revNos, props.showCommonInfo)}
            {$.renderTemplate(props.diff.messageTemplate, props.revNos, props.showCommonInfo)}
            {$.renderPairBooleanItem("Include latest stack trace", props.diff.includeLatestStackTrace, props.revNos, props.showCommonInfo)}
        </div>)}
    </div>
)