/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
export class Annotation extends React.Component<{ data: microflow.IAnnotation, style?: any }, {}>{
    render() {
        var style = {
            top: this.props.data.geometry.top,
            left: this.props.data.geometry.left,
            height: this.props.data.geometry.height,
            width: this.props.data.geometry.width,
            position: "absolute"
        }
        for (var a in this.props.style) {
            style[a] = this.props.style[a];
        }
        return (
            <div className="microflow-wrapper" style={style} >
                <svg width={this.props.data.geometry.width} height={this.props.data.geometry.height}>
                    <rect fill="#f0f0f0" className="mx-mf-annotation" x="0" y="0" rx="0" ry="0" width={this.props.data.geometry.width} height={this.props.data.geometry.height}></rect>
                </svg>
                <div className="mx-mf-activity-content-wrapper mx-mf-activity-annotation-content-wrapper">
                    <div className="item-wrapper-annotation" style={{ height: this.props.data.geometry.height }}>
                        <div className="text-wrapper"><label>{this.props.data.documentation}</label></div>
                        <div className="item-border"></div>
                    </div>
                </div>
            </div>
        )
    }
}
