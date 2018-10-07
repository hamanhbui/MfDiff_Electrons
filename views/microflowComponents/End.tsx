/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
function linearGradient() {
    return (
        <linearGradient id="gradient-mx-mf-end" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0" style={{ "stopColor": "#ffffff" }}></stop>
            <stop offset="1" style={{ "stopColor": "#cd2b2b" }}></stop>
        </linearGradient>
    )
}
export class End extends React.Component<{ data: microflow.IEndEvent, style?: any }, {}>{
    render() {
        var style = {
            top: this.props.data.geometry.top,
            left: this.props.data.geometry.left,
            width: this.props.data.geometry.width,
            height: this.props.data.geometry.height,
            position: "absolute"
        }
        for (var a in this.props.style) {
            style[a] = this.props.style[a];
        }
        return (
            <div className="microflow-wrapper" style={style}>
                <svg width="22" height="22">
                    {linearGradient()}
                    <circle className="mx-mf-end" cx="50%" cy="50%" r="9" x="0" y="0" fill="url(#gradient-mx-mf-end)"></circle>
                </svg>
                <div className="result-item-wrapper" style={{ top: 20 }}>
                    <div className="result-text-wrapper">
                        <label>{this.props.data.returnValue}</label>
                    </div>
                    <div className="result-type-wrapper">
                        <label>{this.props.data.returnType}</label>
                    </div>
                </div>
            </div>
        )
    }
} 
