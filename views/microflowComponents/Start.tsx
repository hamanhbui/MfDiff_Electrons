/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
function linearGradient() {
    return (
        <linearGradient id="gradient-mx-mf-start" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0" style={{ "stopColor": "#ffffff" }}></stop>
            <stop offset="1" style={{ "stopColor": "#4BB819" }}></stop>
        </linearGradient>
    )
}
export class Start extends React.Component<{ data: microflow.IStartEvent, style?: any }, {}> {
    render() {
        var style1 = {
            top: this.props.data.geometry.top,
            left: this.props.data.geometry.left,
            height: this.props.data.geometry.height,
            width: this.props.data.geometry.width,
            position: "absolute"
        }
        for (var a in this.props.style) {
            style1[a] = this.props.style[a];
        }
        return (
            <div className="microflow-wrapper" style={style1}>
                <svg width="22" height="22">
                    {linearGradient()}
                    <circle cx="50%" cy="50%" r="10" stroke="black" fill="url(#gradient-mx-mf-start)" />
                </svg>
            </div>
        )
    }
}