/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
export class HighlightAnnotation extends React.Component<{ data: microflow.IGeometry, style?: any }, {}>{
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
                <svg width={this.props.data.width + 8} height={this.props.data.height + 8}>
                    <rect style={this.props.style} className="mx-mf-annotation" x="0" y="0" rx="0" ry="0" width={this.props.data.width + 8} height={this.props.data.height + 8}></rect>
                </svg>
            </div>
        )
    }
}
