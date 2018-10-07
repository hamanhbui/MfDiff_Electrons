/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class AggregateListAction extends React.Component<{ data: microflow.IAggregateListAction, style?: any }, {}>{
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIJSURBVDhPpY/fT1JhGMf9I/yruujSWm21dG2uu2zdCDZmW4qtUitT8SQ0aWoCAodfIiiCHBWC5Mc0STxHOHARYby2hqz4xnlXHM9gK9fFs+f9vnu+n+/zdAD4r2r7yTjToi2cJY5tnqzEcsQVOSY27oiwDW3nBGIJZYnOkRKl2bYA6+an00ZHhi/Au5mAj0vBz6VhX4shkhRQqwGmQEaaUQLOJdf9H/JwR49hCmZgDR+C3RJgCR5CxyZQKtcw79snLYB/STZvZFAoVjHL7sqAiyQv+j+iXK5jYmlbBlwk2eBIoFIBnhlDMuDd+p4kEEvzuNI3jv7RBcT3eCy6ImDMIUXypHkH8XQJI/o1GTDnofeg+LmCbvU0nurdksTJ1x+IJkVl8lwQvjCPYcYrA2btUQoQxC/oUeugGlsCFxcw73yPaKqIy52dbasJeGXiKCCbL1HA3WEjlld3oWVcCER4TA1oqeHNIy2GGG9dfbNbCRh9u04BuWIFPQMzeKL3gHyTNvqOcCxPb+7rukZNg7d7qbHx1kidAh7rvaR69hO+rX1c6h3BnYcGBHaO4A4dYGjaSW8+n/zH3ARoX3tOq2fAKneAyYUNMKYwzCtJGJYjMNpiyBXquNd1XWFWbHBLNSNqJqzkwQsLGZxiiealjfSPW4hqzELUz63k/tUbLWZJNwF/q9/mlgLQ8QvH5f1ZvbINHAAAAABJRU5ErkJggg==" />
                        </div>
                        <div className="text-wrapper">
                            <label>{this.props.data.caption}</label>
                        </div>
                    </div>
                </div>
                <div className="result-item-wrapper" style={{ top: this.props.data.geometry.height }}>
                    <div className="result-text-wrapper">
                        <label>{this.props.data.returnValue}</label>
                    </div>
                    <div className="result-type-wrapper">
                        <label>{this.props.data.returnType}</label>
                    </div>
                </div>
            </div>
        )
    }
}