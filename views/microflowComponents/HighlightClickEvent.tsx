/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { highlightClickStyle } from "./../../config";
export class HighlightClickEvent extends React.Component<{ id: string, data: microflow.IGeometry }, {}>{
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
                    <svg width="38" height="38">
                        <circle cx="50%" cy="50%" r="17" x="0" y="0" style={highlightClickStyle}></circle>
                    </svg>
                </div>
            )
        }
        return <div />
    }
}   