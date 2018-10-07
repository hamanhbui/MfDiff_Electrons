/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const ShowMessageActionItem = (props: { diff: Diff.IShowMessageActionDiff, revNos: number[], showCommonInfo: boolean }) => (
    <div>
        {$.renderDiffContainer("Action", <div>
            {$.renderPairItem("Type", props.diff.type, props.revNos, props.showCommonInfo)}
            {$.renderTemplate(props.diff.template, props.revNos, props.showCommonInfo)}
            {$.renderPairBooleanItem("Blocking", props.diff.blocking, props.revNos, props.showCommonInfo)}
        </div>)}
    </div>
)