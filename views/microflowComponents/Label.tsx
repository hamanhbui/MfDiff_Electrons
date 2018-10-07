/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
export class Label extends React.Component<{ data: microflow.ILabel, color?: string }, {}>{
    render() {
        var style = {
            top: this.props.data.top,
            left: this.props.data.left,
            position: "absolute",
        }
        return (
            <div style={style} className="microflow-entity ">
                {this.props.data.caption}<sub>{this.props.data.numbercap}</sub>
            </div>
        )
    }
}