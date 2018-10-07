/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const ExportXmlActionItem = (props: { diff: Diff.IExportXmlActionDiff, revNos: number[], showCommonInfo: boolean }) => (
    <div>
        {$.renderDiffContainer("Export Mapping",
            <div>
                {$.renderPairItem("Mapping", props.diff.mappingName, props.revNos, props.showCommonInfo)}
                {$.renderPairItem("Parameter", props.diff.mappingArgumentVariableName, props.revNos, props.showCommonInfo)}
            </div>)}
        {$.renderDiffContainer("Validation", <div>
            {$.renderPairBooleanItem("Validation against schema", props.diff.isValidationRequired, props.revNos, props.showCommonInfo)}
        </div>)}
        {$.renderOutputMethod(props.diff.outputMethod, props.revNos, props.showCommonInfo)}}
    </div>
)