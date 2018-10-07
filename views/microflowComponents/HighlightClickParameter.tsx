/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { highlightClickStyle } from "./../../config";
export class HighlightClickParameter extends React.Component<{ id: string, data: microflow.IGeometry }, {}>{
    render() {
        if (this.props.id && this.props.data) {
            var style = {
                top: this.props.data.top - 8,
                left: this.props.data.left - 8,
                width: this.props.data.width + 16,
                height: this.props.data.height + 16,
                position: "absolute"
            }
            return (
                <div style={style}>
                    <svg width="48" height="48">
                        <polygon style={highlightClickStyle} className="mx-mf-parameter" points="0,0 23,0 46,23 23,46 0,46"></polygon>
                    </svg>
                </div>
            )
        }
        return <div />
    }
} 