/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export class CommitActionItem extends React.Component<{ diff: Diff.ICommitActionDiff, revNos: number[], showCommonInfo: boolean }, {}> {

    render() {
        return <div>
            {$.renderDiffContainer("Input", <div>
                {$.renderPairItem("Variable name", this.props.diff.commitVariableName, this.props.revNos, this.props.showCommonInfo)}
            </div>)}
            {$.renderDiffContainer("Action", <div>
                {$.renderPairBooleanItem("With events", this.props.diff.withEvents, this.props.revNos, this.props.showCommonInfo)}
                {$.renderPairBooleanItem("Refresh in client", this.props.diff.refreshInClient, this.props.revNos, this.props.showCommonInfo)}
            </div>)}
        </div>
    }
}
