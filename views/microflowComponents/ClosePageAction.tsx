/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class ClosePageAction extends React.Component<{ data: microflow.IClosePageAction, style?: any }, {}>{
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG1SURBVDhPpZNbK0RRGIbXT/Av/AS/YpKISVNSk5RTTNQMuTBEOSQpN0iIxikjkpTU3EhuiHKacDF7z2abPXvsmSu8vm8th2aaGcqqp++w3vWu1bfbAsC/yNvMZaekxEUgDy5R0R5qGg1Hne7lWwSWiMVr+Ocv0TV3gc7Zc/hmzqQ46inHXUMtLspKcd9UJ2vui4G16NvEXhzFYOFDmxev1jP00X682klpIg345t9gId9sTI4A7+/QR/pkLQ0CizfIZDJFYeF9S728OT4+KONdo0cZ+BeukE6n4UgcOA5BeSQS+YaFBWfAA0ulUnAHz755oZoPfi1jd1eK8+ASPO2kbcNOEvQ0Fe0sg9zF+57eHU6F4E+VSFiwLEtGiZWgmKCeij/wPvWJ2p4tZeCbPoVpmnj6hHPzycyaQS6scwc2lUHb1AkMw8iaAdcsLLQeHw1Uda5xKkTr5DF0XSfin1FRzID3K30rnArRPHGEWEwjYtAIjgrVk1GjPY1rjSLrNFR0hJQB/QuhxrEIGoYP4R06QP3APuqCezTlbTkod3cYNf4NVHet07NX6eYQ6AzDDn/7GwsD8QH9zBkcIMpz8gAAAABJRU5ErkJggg==" />
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