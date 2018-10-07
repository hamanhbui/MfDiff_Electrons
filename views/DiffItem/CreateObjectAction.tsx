/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export class CreateObjectActionItem extends React.Component<{ diff: Diff.ICreateObjectActionDiff, revNos: number[], showCommonInfo: boolean }, {}> {
    render() {
        return (
            <div>
                {$.renderDiffContainer("Action", <div>
                    {$.renderPairItem("Entity", this.props.diff.entityName, this.props.revNos, this.props.showCommonInfo)}
                    {$.renderEnumItem("Commit", this.props.diff.commit, this.props.showCommonInfo, ["Yes", "Yes without events", "No"])}
                    {$.renderPairBooleanItem("Refresh in client", this.props.diff.refreshInClient, this.props.revNos, this.props.showCommonInfo)}
                    {$.renderArrayItem("", this.props.diff.items, this.props.revNos, this.props.showCommonInfo, new $.DisplayArrayItemOption(
                        $.ArrayType.MemberChange, ["Member", "Member type", "Type", "Value"]
                    ))}
                </div>)}
                {$.renderDiffContainer("Output", <div>{$.renderPairItem("Name", this.props.diff.outputVarialeName, this.props.revNos, this.props.showCommonInfo)}</div>)}
            </div>
        )
    }
}