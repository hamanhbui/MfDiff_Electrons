/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class ListOperation extends React.Component<{ data: microflow.IListOperation, style?: any }, {}>{
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI0SURBVDhPpZDbT9JhGMf9Z+yuK9Zha63zhXRh68awrVV0od3lmhdCjdVFaqvUylQgYZOmJiBnEEER5KdCkBzmgcQfCnKhUby0hqz45vtrcVi2cl08e/d99ryfz/O+NQD+q/Ztys3RlN4bJ6Z5lkwENonFt0H0zDox7mUDkyBaT5xITZEUnd0XoJv9kNs7EWO3YJ8NwcFE4GSiMEwF4AsnUCgAaleMzlQDKsxF5/skrP4NqN0x6LxrMM4loHWvQWoMYSdTwLBjmfwG+BezZiaGrXQeg8bFMuAg5lHnCjKZInrH5suAg5iVphCyWeCZylMGvJ1eogGBKIuGlh60dY0guMRi1OKDXOOpMvdpFhCM7qBTMVUGDNm49yC9ncVN8QCeKqw04tPnb/CHU9XmITccXhbtcnsZMGjwc4BE6iOEYilE3WNgggkMm9/BH0lz5ltXW8E/eR1HDl3E+WMCCAUt4NXW/QS8UjMcIJ7c4QB32lUYn1xEh9wCl4+FpLUfl840o5F/t1T1p5uLZ3mNMg7Q9WaaA2ymsxDek+GJwgbyhW70Fd5AEheOX+Mu5QgpFc0nDl/e5gCPFXaS3/0Ox9wy+E2duP1QCdfCOqyeVTwaMHNrV9p/Fe1zgI7Xtlx+F5hkVtE3MgO52gvNRBjKcR9U+gDOHRVwF/64wQ2RLCXp1ZH7L7TkQb+RSF7qSVuPloi6tUT8XEeuNIgK9M2V9vpTTYXSH/yt6G/TYWqka9OTZl5tXc0P0r//TWoSw5oAAAAASUVORK5CYII=" />
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