/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
export class HighlightAction extends React.Component<{ data: microflow.IGeometry, style?: any }, {}>{
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
                <svg width={this.props.data.width + 10} height={this.props.data.height + 10}>
                    <g transform="translate(1, 1)">
                        <rect className="mx-mf-action" x="0" y="0" rx="12" ry="12" width={this.props.data.width + 7} height={this.props.data.height + 7} style={this.props.style}></rect>
                    </g>
                </svg>
            </div>
        )
    }
} 