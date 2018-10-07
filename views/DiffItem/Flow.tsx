/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import single = require("../../MfDiff/SingleInterface")
import * as $ from "./"
import { IViewOption } from "../MfDiffList"

export class FlowItem extends React.Component<{ diff: Diff.IMfElementDiffBase, revNos: number[], showCommonInfo }, {}> {
    render() {
        switch (this.props.diff.typeName) {
            case single.ElementType.SequenceFlow: return <$.SequenceFlowItem diff={this.props.diff} revNos={this.props.revNos} showCommonInfo={this.props.showCommonInfo} />
            default: return <span />
        }
    }
}

export class FlowContainer extends React.Component<{ diff: Diff.IFlowDiff, revNos: number[], viewOption: IViewOption, label?: string, borderColor: string }, {}> {
    render() {
        return <$.ElementContainer diff={this.props.diff} label={this.props.label} name={this.props.diff.typeName} viewOption={this.props.viewOption} borderColor={this.props.borderColor}>
            <$.FlowItem diff={this.props.diff} revNos={this.props.revNos} showCommonInfo={this.props.viewOption.showCommonInfo} />
            {$.renderDiffContainer("Connection index", <div>
                {$.renderPairItem("Origin", this.props.diff.originConnectionIndex, this.props.revNos, this.props.viewOption.showCommonInfo)}
                {$.renderPairItem("Destination", this.props.diff.destinationConnectionIndex, this.props.revNos, this.props.viewOption.showCommonInfo)}
            </div>)}
        </$.ElementContainer>
    }
}