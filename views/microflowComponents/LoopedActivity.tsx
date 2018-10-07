/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
export class Loopedactivity extends React.Component<{ data: microflow.ILoopedActivity, style?: any }, {}>{
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
            <div style={style}>
                <svg width={this.props.data.geometry.width++ + 2} height={this.props.data.geometry.height++ + 2}>
                    <linearGradient id="gradient-loop" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0" style={{ "stopColor": "#ffffff" }}></stop>
                        <stop offset="1" style={{ "stopColor": "#e1ebfa" }}></stop>
                    </linearGradient>
                    <g transform="translate(1, 1)">
                        <rect className="mx-mf-loopedactivity" x="0" y="0" rx="12" ry="12" width={this.props.data.geometry.width - 1} height={this.props.data.geometry.height - 1} fill="url(#gradient-loop)" ></rect>
                    </g>
                </svg>
            </div >
        )
    }
}