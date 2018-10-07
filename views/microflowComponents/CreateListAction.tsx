/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class CreateListAction extends React.Component<{ data: microflow.ICreateListAction, style?: any }, {}>{
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJNSURBVDhPpZLLTxNRFIf5N9y6cuPClTv/AGLiwgU7Q8EHwYXRxJhQVJBFy7NQLRbaSkko8mrLtNPX9AGlpQO0ttCHIJUyhT4WVrQXo9AoPzuDWhtZQJzk5OTcnPN9595MDYD/ihMPNdZE1hRIEcsyR5jwLrEFd4iJ3SZ0uTazaWL0p4jKEs/yvScCqMX3++WMJJeDczEKNxuHh03APBdGMJZGqQTovUm+pxrwl/nIs5qBPbQDvS8JKrAFeikNo28LKjqKwl4JE+4N8g/gNGbDQhK5/AFG6LUK4CzmKc877O0dYXBmuQI4i3nUEkWxCMh0/gpgen6dLxBOcKh7IEdL/yQi6xymbEFoDP4qs9KwgkiigC7tXAUw5hDug/yHIhpah9GntfMlPn3+jlAsW20e88Ed4CDVOCuAEXNIAKSzH9HYqoJ4YAZsJI0J6xuE4nnBLBl6iodDItzuuwZRVy3alY/4kWPASz0rAFKZggC4L9Vh1rWGTo0N3iCHceY12qdFoOMKrOYYyJzNqJNdxOW753oEQP/4vADYzRfR+FiNXq0D5Au/0VcEwhnBSMX6Qb2V823ocd2CzHWHB3wTAN1aJzk4/AH30gZqm7rQ3DEK78o27P5NSIatuCq+BGtcLQz//kxRBQ84/oE6Xzn2Dw4BF7sJ5eQCNPoADEwMo7NB6ExhXLl3Ht1MAyRMvTAscdRXbyASq7NtgxR58sJIng3RpE1hIi1yIxEPGEnrc4o0ddzA9Z4L6GVuCmY+8/WfNzhNlJul5SD82r+yFEDNT9tTFixQsEJyAAAAAElFTkSuQmCC" />
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
                        <label>{this.props.data.initialValue}</label>
                    </div>
                </div>
            </div>
        )
    }
}