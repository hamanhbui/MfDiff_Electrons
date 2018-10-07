/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class ExportXmlAction extends React.Component<{ data: microflow.IExportXmlAction, style?: any }, {}>{
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
                <svg width={this.props.data.geometry.width + 2} height={this.props.data.geometry.height + 2}>
                    {linearGradient(this.props.data.backgroundColor)}
                    <g transform="translate(1, 1)">
                        <rect className="mx-mf-action" x="0" y="0" rx="12" ry="12" width={this.props.data.geometry.width - 1} height={this.props.data.geometry.height - 1} fill={fillName}></rect>
                    </g>
                </svg>
                <div className="mx-mf-activity-content-wrapper">
                    <div className="item-wrapper">
                        <div className="image-wrapper">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAP5JREFUOE9jIBYET/bVCO2z5IRyUUFO25L/2DBUGgzCJwf+j5kedidgUoAyVAgBQIqv3XmBghN7qv6HT/JvhGOgAT372v5ETQv5HDbJ3xeqFQLQDZi2fc5/kIbKTcVw3HWw5f/si9P+9xxu/x8zI+xr5NSQHqh27Abkrc743360EStuOlADtgCqHbcLQIbAcNWOErDmml1l/6Onh3yNnBbcC9WOPRBBYRA2OaAehkEGFm/I/RMxNRgzDGAAphnKRQEgAyKnBt/FGgswgM+A0In+gWSnA2xyIAyVhihADkQQRlZASB6nAmSMTR6qnYYGQKWJ8wI2DJUmKE8BYGAAAOXmwyJav1ykAAAAAElFTkSuQmCC" />
                        </div>
                        <div className="text-wrapper">
                            <label>{this.props.data.caption}</label>
                        </div>
                    </div>
                </div>
                <div className="result-item-wrapper" style={{ top: this.props.data.geometry.height }}>
                    <div className="result-text-wrapper">
                        <label>{this.props.data.variableName}</label>
                    </div>
                    <div className="result-type-wrapper">
                        <label>{this.props.data.returnType}</label>
                    </div>
                </div>
            </div>
        )
    }
}