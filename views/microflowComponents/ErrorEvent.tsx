/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
export class ErrorEvent extends React.Component<{ data: microflow.IErrorEvent, style?: any }, {}>{
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
                    <linearGradient id="gradient-mx-mf-error" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0" style={{ "stopColor": "#ffece6" }}></stop>
                        <stop offset="1" style={{ "stopColor": "#ff582a" }}></stop>
                    </linearGradient>
                    <circle className="mx-mf-error" cx="50%" cy="50%" r="9" x="0" y="0" fill="url(#gradient-mx-mf-error)"></circle>
                </svg>
                <div className="mx-mf-image-wrapper" style={{ width: 20, height: 20 }}>
                    <img src="https://cdn.modelshare.mendix.com/img/lightning.png" className="mx-mf-error-image" />
                </div>
            </div>
        )
    }
}