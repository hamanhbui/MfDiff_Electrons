/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { highlightClickStyle } from "./../../config";
export class HighlightClickSplit extends React.Component<{ id: string, data: microflow.IGeometry }, {}>{
    render() {
        if (this.props.id && this.props.data) {
            var style = {
                top: this.props.data.top - 8,
                left: this.props.data.left - 8,
                height: this.props.data.height + 16,
                width: this.props.data.width + 16,
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
                <div key={"hl_" + this.props.id} style={style}>
                    <svg width={this.props.data.width + 18} height={this.props.data.height + 18}>
                        <g transform="translate(1, 1)">
                            <polygon points={polygon1} stroke="black" style={highlightClickStyle} />
                        </g>
                    </svg>
                </div>
            )
        }
        return <div />
    }
}