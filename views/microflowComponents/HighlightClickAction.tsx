/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { highlightClickStyle } from "./../../config";
export class HighlightClickAction extends React.Component<{ id: string, data: microflow.IGeometry }, {}>{
    render() {
        if (this.props.id && this.props.data) {
            var style = {
                top: this.props.data.top - 8,
                left: this.props.data.left - 8,
                height: this.props.data.height + 16,
                width: this.props.data.width + 16,
                position: "absolute"
            }
            return (
                <div key={"hl_" + this.props.id} style={style}>
                    <svg width={this.props.data.width + 18} height={this.props.data.height + 18}>
                        <g transform="translate(1, 1)">
                            <rect className="mx-mf-action" x="0" y="0" rx="12" ry="12" width={this.props.data.width + 15} height={this.props.data.height + 15} style={highlightClickStyle}></rect>
                        </g>
                    </svg>
                </div >
            )
        }
        return <div />
    }
} 