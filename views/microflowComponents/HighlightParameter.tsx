/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
export class HighlightParameter extends React.Component<{ data: microflow.IGeometry, style?: any }, {}>{
    render() {
        var style = {
            top: this.props.data.top - 4,
            left: this.props.data.left - 4,
            width: this.props.data.width + 8,
            height: this.props.data.height + 8,
            position: "absolute"
        }
        return (
            <div className="microflow-highlight-wrapper" style={style}>
                <svg width="40" height="40">
                    <polygon style={this.props.style} className="mx-mf-parameter" points="0,0 19,0 38,19 19,38 0,38"></polygon>
                </svg>
            </div>
        )
    }
} 