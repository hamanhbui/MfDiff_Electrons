/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
// import { microflows as mfs } from "mendixmodelsdk"
// import { observer } from "mobx-react";
// import { AppState } from "./ApplicationState";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"


export class ChangeVariableActionItem extends React.Component<{ diff: Diff.IChangeVariableActionDiff, revNos: number[], showCommonInfo: boolean }, {}> {
    render() {
        return <div>
            {$.renderDiffContainer("Input", <div>{$.renderPairItem("Variable", this.props.diff.changeVariableName, this.props.revNos, this.props.showCommonInfo)}</div>)}
            {$.renderDiffContainer("Action", <div>{$.renderPairTextAreaItem("Value", this.props.diff.value, this.props.showCommonInfo)}</div>)}
        </div>
    }
}