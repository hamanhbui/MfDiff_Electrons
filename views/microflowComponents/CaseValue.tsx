/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
export class CaseValue extends React.Component<{ data: microflow.IEntity, color?: string }, {}>{
    render() {
        var style = {
            top: this.props.data.geometry.top,
            left: this.props.data.geometry.left,
            position: "absolute",
        }
        return (
            <div style={style} className="microflow-entity ">
                {this.props.data.caption}
            </div>
        )
    }
}