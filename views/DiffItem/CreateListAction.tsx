/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const CreateListActionItem = (props: { diff: Diff.ICreateListActionDiff, revNos: number[], showCommonInfo: boolean }) => {
    return (<div>
        {$.renderDiffContainer("Action", <div>{$.renderPairItem("Entity", props.diff.entityName, props.revNos, props.showCommonInfo)}</div>)}
        {$.renderDiffContainer("Output", <div>{$.renderPairItem("Variable", props.diff.outputVariableName, props.revNos, props.showCommonInfo)}</div>)}
    </div>)
}