/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const GenerateDocumentActionItem = (props: { diff: Diff.IGenerateDocumentActionDiff, revNos: number[], showCommonInfo: boolean }) => (
    <div>
        {$.renderDiffContainer("Action", <div>
            {$.renderPairItem("File", props.diff.fileVariableName, props.revNos, props.showCommonInfo)}
        {$.renderVerticalEnumItem("Language", ["Current user", "Project default", "Variable_"], props.showCommonInfo, props.diff.languageType)}
        {$.renderPairItem("Document type", props.diff.documentType, props.revNos, props.showCommonInfo)}
        {$.renderPairItem("Template", props.diff.documentTemplateName, props.revNos, props.showCommonInfo)}
        {$.renderPairCheckBox("", "Override left margin in inch", props.diff.marginLeftInInch, props.diff.overrideLeftMargin, props.revNos, props.showCommonInfo)}
        {$.renderPairCheckBox("", "Override right margin in inch", props.diff.marginRightInInch, props.diff.overrideRightMargin, props.revNos, props.showCommonInfo)}
        {$.renderPairCheckBox("", "Override bottom margin in inch", props.diff.marginBottomInInch, props.diff.overrideBottomMargin, props.revNos, props.showCommonInfo)}
        {$.renderPairCheckBox("", "Override top margin in inch", props.diff.marginTopInInch, props.diff.overrideTopMargin, props.revNos, props.showCommonInfo)}
        {$.renderArrayItem("", props.diff.parameterMappings, props.revNos, props.showCommonInfo, new $.DisplayArrayItemOption(
            $.ArrayType.Attribute, ["Widget", "Argument"]
        ))}
        </div>)}
    </div>
)