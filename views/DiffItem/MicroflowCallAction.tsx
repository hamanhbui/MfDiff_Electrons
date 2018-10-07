/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const MicroflowCallActionItem = (props: { diff: Diff.IMicroflowCallActionDiff, revNos: number[], showCommonInfo: boolean }) => (
    <div>
        {$.renderDiffContainer("Action", <div>
            {$.renderPairItem("Microflow", props.diff.microflowCallName, props.revNos, props.showCommonInfo)}
            {$.renderArrayItem("", props.diff.parameters, props.revNos, props.showCommonInfo, new $.DisplayArrayItemOption(
                $.ArrayType.Parameter, ["Name", "Type", "Argument"]
            ))}
        </div>)}
        {$.renderDiffContainer("Output", <div>
            {$.renderPairItem("Return type", props.diff.returnType, props.revNos, props.showCommonInfo)}
            {$.renderPairBooleanItem("Use return value", props.diff.useReturnVariable, props.revNos, props.showCommonInfo)}
            {$.renderPairItem("Name", props.diff.outputVariableName, props.revNos, props.showCommonInfo)}
        </div>)}
    </div>
)