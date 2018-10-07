/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
export class HighlightEvent extends React.Component<{ data: microflow.IGeometry, style?: any }, {}>{
    render() {
        var style = {
            top: this.props.data.top - 4,
            left: this.props.data.left - 4,
            height: this.props.data.height + 8,
            width: this.props.data.width + 8,
            position: "absolute"
        }
        return (
            <div className="microflow-highlight-wrapper" style={style}>
                <svg width="30" height="30">
                    <circle cx="50%" cy="50%" r="13" x="0" y="0" style={this.props.style}></circle>
                </svg>
            </div>
        )
    }
}