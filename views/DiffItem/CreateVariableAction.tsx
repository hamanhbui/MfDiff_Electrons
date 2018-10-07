/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"


export class CreateVariableActionItem extends React.Component<{ diff: Diff.ICreateVariableActionDiff, revNos: number[], showCommonInfo }, {}> {
    render() {
        return <div>
            {$.renderDiffContainer("Action", <div>
                {$.renderPairItem("Data type", this.props.diff.variableDateType, this.props.revNos, this.props.showCommonInfo)}
                {$.renderPairTextAreaItem("", this.props.diff.initialValue, this.props.showCommonInfo)}
            </div>)}
            {$.renderDiffContainer("Output", <div>{$.renderPairItem("Variable", this.props.diff.variableName, this.props.revNos, this.props.showCommonInfo)}</div>)}
        </div>
    }
}