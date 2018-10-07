/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class ImportXmlAction extends React.Component<{ data: microflow.IImportXmlAction, style?: any }, {}>{
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAPNJREFUOE9jIAaE9llyhk0OCIByMUFO25L/2DBILmBSgHLM9LA74ZMDwXysAKT42p0XKBgkFjbJ3zdqWsjnnn1tf0AGhE/yb0TGUO3YDUjsq/gfMyPsa+/h9v+zL07733Ww5X/lpmI4hhmI0wCQgqYDNf/bjzZixflrMvEbkNhX/j96esjXml1lYA1VO0r+563OgGMMF2DDoDCImBr8uXhDLjgMgDFRj4zBmpEBTCOUCwagWIicFow/FmAAmwEgAEoHoRP9A6FcTADTiI6h0gTlwQrQAxFZASF5nAqQMTZ5qHYaGgCVJs4L2DBUmqA8BYCBAQDRqM+POZ2SXgAAAABJRU5ErkJggg==" />
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