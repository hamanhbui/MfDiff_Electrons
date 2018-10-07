/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const JavaActionCallActionItem = (props: { diff: Diff.IJavaActionCallActionDiff, revNos: number[], showCommonInfo: boolean }) => {
    return <div>
        {$.renderDiffContainer("Action", <div>
            {$.renderPairItem("Java action", props.diff.javaActionName, props.revNos, props.showCommonInfo)}
        </div>)}
        {$.renderDiffContainer("Input", <div>
            {$.renderArrayItem("", props.diff.parameters, props.revNos, props.showCommonInfo, new $.DisplayArrayItemOption(
                $.ArrayType.Parameter, ["Name", "Type", "Argument"]
            ))}
        </div>)}
        {$.renderDiffContainer("Output", <div>
            {$.renderPairItem("Return type", props.diff.returnType, props.revNos, props.showCommonInfo)}
            {$.renderPairItem("Variable", props.diff.outputVariableName, props.revNos, props.showCommonInfo)}
        </div>)}
    </div>
}