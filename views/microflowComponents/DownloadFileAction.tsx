/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class DownloadFileAction extends React.Component<{ data: microflow.IDownloadFileAction, style?: any }, {}>{
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
        let fillName = findFillName(this.props.data.backgroundColor);
        return (
            <div className="microflow-wrapper" style={style}>
                <svg width={this.props.data.geometry.width++ + 2} height={this.props.data.geometry.height++ + 2}>
                    {linearGradient(this.props.data.backgroundColor)}
                    <g transform="translate(1, 1)">
                        <rect className="mx-mf-action" x="0" y="0" rx="12" ry="12" width={this.props.data.geometry.width - 1} height={this.props.data.geometry.height - 1} fill={fillName}></rect>
                    </g>
                </svg>
                <div className="mx-mf-activity-content-wrapper">
                    <div className="item-wrapper">
                        <div className="image-wrapper">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGkSURBVDhPlZPNK0RRGMaHhb+CUhYohDGz8h/Y+KZm8j2poYiVlWKjycLUDK5iykJqLCwkC0spKYTsbWaar+Z75s4Hj/PcHMYwjFO/7unc+/zu+751dAB0YlUL9ALjH9QKKpmRSIFeVdVILpd7yefz+AnxHg6Hw14skQIjw4lEAslk8oNoNIpwOAyfz6dJvF4vnE7nFwlXhcDID9LpNDKZjPYk8XgckUgEfr9fE6RSKfAniqJokm8ChiUUMBCLxRAIBL60Q5h5z34KRBsfH3DPvmUrwWBQq8Tj8ZQWFFMoYSWcRygUKl9ApITtcCYU8bxsAclms9pcKCE8+5eAVcyej2H61Izx4yGYD3v/FjAkYQWWExMOnnax/6Cgb6+rfAHDZMTdD9f9JpRbO0yuPtR31038KpAS28Uqxt1DWDyxYutmA/ZrG+aPrehcNmQMS61nhYLXYgFRsypm3FOYOZrExtUabJcrGN7pRdtC03PLXGOVvAsdYspJESh5mSyuUZj3BjC43Y3B9Z4XkdEXXqYaSgQcTEnaF1sem60Nd2LPq18DQPcGXKyaHF3B4JYAAAAASUVORK5CYII=" />
                        </div>
                        <div className="text-wrapper">
                            <label>{this.props.data.caption}</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}