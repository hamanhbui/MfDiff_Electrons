/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { IPosition } from "./interfaces/baseInterfaces";
export class LoopedParameter extends React.Component<{ data: microflow.ILoopedActivity, point: IPosition, style?: any }, {}>{
    render() {
        var style = {
            top: this.props.point.top + 20,
            left: this.props.point.left + 20,
            width: 30,
            height: 30,
            position: "absolute"
        }
        for (var a in this.props.style) {
            style[a] = this.props.style[a];
        }
        return (
            <div style={style}>
                <svg width="32" height="32">
                    <polygon fill="#f5f5dc" className="mx-mf-parameter" points="0,0 15,0 30,15 15,30 0,30"></polygon>
                </svg>
                <div className="mx-mf-image-wrapper" style={{ width: 30, height: 30 }}>
                    <img src="https://cdn.modelshare.mendix.com/img/loop.png" className="mx-mf-loop-parameter-image" />
                </div>
                <div className="result-item-wrapper" style={{ top: 30 }}>
                    <div className="result-text-wrapper">
                        <label>{this.props.data.loopVariableName}</label>
                    </div>
                    <div className="result-type-wrapper">
                        <label>{this.props.data.iteratedListVariableName}</label>
                    </div>
                </div>
            </div>
        )
    }
}