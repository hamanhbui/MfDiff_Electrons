/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const DownloadFileActionItem = (props: { diff: Diff.IDownloadFileActionDiff, revNos: number[], showCommonInfo: boolean }) => {
    return (
        <div>
            {$.renderDiffContainer("Input", <div>{$.renderPairItem("File document", props.diff.fileDocumentVariableName, props.revNos, props.showCommonInfo)}</div>)}
            {$.renderDiffContainer("Action", <div>{$.renderPairBooleanItem("Show file in browser", props.diff.showFileInBrowser, props.revNos, props.showCommonInfo)}</div>)}
        </div>
    )
}