/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"
import { Label } from "../../Utils/generateLabel"
import { IViewOption } from "../MfDiffList"

export class DiffItem extends React.Component<{ diff: Diff.IMfElementDiffBase, revNos: number[], viewOption: IViewOption, labels: Label, elementType: string }, {}> {
    render() {
        if (this.props.diff.typeName.name.includes("Flow")) {
            if (!this.props.viewOption.showFlow) return <span />
            return <$.FlowContainer
                diff={this.props.diff}
                revNos={this.props.revNos}
                viewOption={this.props.viewOption}
                label={this.props.labels ? this.props.labels[this.props.diff.id as string] : undefined}
                borderColor={this.props.elementType} />
        }
        if (this.props.diff.typeName.name.includes("Property")) {
            return <span />
        }
        return <$.MfObjectContainer
            diff={this.props.diff}
            revNos={this.props.revNos}
            viewOption={this.props.viewOption}
            label={this.props.labels ? this.props.labels[this.props.diff.id as string] : undefined}
            borderColor={this.props.elementType} />
    }
}
export class DiffProperty extends React.Component<{ diff: Diff.IMfElementDiffBase, revNos: number[], viewOption: IViewOption, labels: Label, elementType: string }, {}> {
    render() {
        if (this.props.diff.typeName.name.includes("Property")) {
            return <$.MfProperty diff={this.props.diff}
                revNos={this.props.revNos}
                viewOption={this.props.viewOption}
                label={this.props.labels ? this.props.labels[this.props.diff.id as string] : undefined}
                borderColor={this.props.elementType} />
        }
        return <span />
    }
}