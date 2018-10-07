/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { highlightClickStyle } from "./../../config";
export class HighlightClickAnnotation extends React.Component<{ id: string, data: microflow.IGeometry }, {}>{
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
                    <svg width={this.props.data.width + 16} height={this.props.data.height + 16}>
                        <rect style={highlightClickStyle} className="mx-mf-annotation" x="0" y="0" rx="0" ry="0" width={this.props.data.width + 15} height={this.props.data.height + 15}></rect>
                    </svg>
                </div>
            )
        }
        return <div />
    }
}
