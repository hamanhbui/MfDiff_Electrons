/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
export class ContinueEvent extends React.Component<{ data: microflow.IContinueEvent, style?: any }, {}>{
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
            <div className="microflow-wrapper" style={style}>
                <svg width="22" height="22">
                    <linearGradient id="gradient-mx-mf-continue" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0" style={{ "stopColor": "#ffffff" }}></stop>
                        <stop offset="1" style={{ "stopColor": "#e1ebfa" }}></stop>
                    </linearGradient>
                    <circle className="mx-mf-continue" cx="50%" cy="50%" r="9" x="0" y="0" fill="url(#gradient-mx-mf-continue)"></circle>
                    <circle className="mx-mf-continue" cx="50%" cy="50%" r="5" x="0" y="0" fill="url(#gradient-mx-mf-continue)"></circle>
                </svg>
            </div>
        )
    }
}