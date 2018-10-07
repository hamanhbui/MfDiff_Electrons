/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
export class HighlightSplit extends React.Component<{ data: microflow.IGeometry, style?: any }, {}>{
    render() {
        var style = {
            top: this.props.data.top - 4,
            left: this.props.data.left - 4,
            height: this.props.data.height + 8,
            width: this.props.data.width + 8,
            position: "absolute"
        }
        var geometry = {
            p1: (style.width / 2).toString() + ",0",
            p2: (style.width).toString() + "," + (style.height / 2).toString(),
            p3: (style.width / 2).toString() + "," + (style.height).toString(),
            p4: "0," + (style.height / 2).toString()
        }
        let polygon1: string = "";
        for (var a in geometry) {
            polygon1 += geometry[a] + " ";
        }
        return (
            <div className="microflow-highlight-wrapper" style={style}>
                <svg width={this.props.data.width + 10} height={this.props.data.height + 10}>
                    <g transform="translate(1, 1)">
                        <polygon points={polygon1} stroke="black" style={this.props.style} />
                    </g>
                </svg>
            </div>
        )
    }
}