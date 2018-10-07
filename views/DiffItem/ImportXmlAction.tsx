/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const ImportXmlActionItem = (props: { diff: Diff.IImportXmlActionDiff, revNos: number[], showCommonInfo: boolean }) => {
    return <div>
        {$.renderDiffContainer("Input", <div>{$.renderPairItem("Variable", props.diff.xmlDocumentVariableName, props.revNos, props.showCommonInfo)}</div>)}
        {$.renderResponse(props.diff.resultHandling, props.revNos, props.showCommonInfo)}
        {$.renderDiffContainer("Validation", <div>{$.renderPairBooleanItem("Validation against schema", props.diff.isValidationRequired, props.revNos, props.showCommonInfo)}</div>)}
    </div>
}