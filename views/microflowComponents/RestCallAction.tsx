/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class RestCallAction extends React.Component<{ data: microflow.IRestCallAction, style?: any }, {}>{
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI9SURBVDhPlVJrSxNgFH77Hv2A/kcfgj4XRAYVdjOdaJjpLNPFMudlza28wbyt5TRTdN4mrZmzoRki87JWUoqGpnYx8V4kgQX6dM6BnLVFdODAe3me5zzveY+Kv2YJS026WV1Iu+WOTsrGycQbOJGg/y35jO8YE1Eg9opJMeBfwZi/CnAVjo6+MUnX09do732FJyOz0N+plTvG7JDYdtzVAkmypk5dzBKQu39CBMY//ZD96LtvaOgcljU/Z4dMpCNnL+fOn75kEGusnm604cXshoAjhQgwOUZrNJFtqTa5uIXByVWxW+Rwg53ctnfA4eqHvbUPtuZeVDT6QgJcmWwjMP0Fy1QsOPMVPcH3YptJVc4enEnOgaG0AaX3O1FY/RAFVW0hgXMpeQusPLcGjM1/h39iRRrV4nuJ4ppHQjJVtiItt0L6wAVGpj6HBOjd6B6ekcOB8SX4AnNiv8n7XJ6QYbKL9eMaHTY2gY/E/bAu/JAAd7VrcBqP/VPwDLyRL6v3DCHP2iSNNJY3i8CfIQLnU/PFATfnXtszeIfeorErINavWxxINZSBG/zrW3eHDBIJLN8sfgCzrR2Wuy6x6+wOos7th7Xei/wyJxJ1hSDcNhE2qaokrddI1KcORSUk0ywgq6gOLMRTpjNXiwvuBTvj+wOHY6KVUnuosNqdHPui4jJrGJSSbYU2pxxJ+hL5+5JaD/iLj8VmOAi3l4cuTIAPKfYfPKrR0kwsMYHfTGu2PUrn8XzPuEgZpvh/CfUTadij2B0BVp8AAAAASUVORK5CYII=" />
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