/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
export class Parameter extends React.Component<{ data: microflow.IMicroflowParameter, style?: any }, {}>{
    render() {
        var style = {
            top: this.props.data.geometry.top,
            left: this.props.data.geometry.left,
            width: this.props.data.geometry.width,
            height: this.props.data.geometry.height,
            position: "absolute"
        }
        for (var a in this.props.style) {
            style[a] = this.props.style[a];
        }
        return (
            <div className="microflow-wrapper" style={style}>
                <svg width="32" height="32">
                    <polygon fill="#f5f5dc" className="mx-mf-parameter" points="0,0 15,0 30,15 15,30 0,30"></polygon>
                </svg>
                <div className="result-item-wrapper" style={{ top: 30 }}>
                    <div className="result-text-wrapper">
                        <label>{this.props.data.Name}</label>
                    </div>
                    <div className="result-type-wrapper">
                        <label>{this.props.data.typeName}</label>
                    </div>
                </div>
            </div>
        )
    }
} 