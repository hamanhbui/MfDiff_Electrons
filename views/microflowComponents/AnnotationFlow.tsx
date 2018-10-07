/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
export class AnnotationFlow extends React.Component<{ data: microflow.IAnnotationFlow, style?: any }, {}>{
    render() {
        var style1 = {
            x: this.props.data.origin.geometry.left,
            y: this.props.data.origin.geometry.top,
        }
        var style2 = {
            x: this.props.data.destination.geometry.left,
            y: this.props.data.destination.geometry.top,
        }
        var style = [style1, style2];
        var min = {
            x: this.props.data.origin.geometry.left,
            y: this.props.data.origin.geometry.top,
        }
        var max = {
            x: this.props.data.origin.geometry.left,
            y: this.props.data.origin.geometry.top,
        }
        for (var count = 0; count < style.length; count++) {
            if (style[count].x < min.x) {
                min.x = style[count].x;
            }
            if (style[count].y < min.y) {
                min.y = style[count].y;
            }
            if (style[count].x > max.x) {
                max.x = style[count].x;
            }
            if (style[count].y > max.y) {
                max.y = style[count].y;
            }
        }
        var path1: string = "";
        path1 = "M " + (style1.x - min.x + 5).toString() + " " + (style1.y - min.y + 5).toString() + " " +
            "L " + (style2.x - min.x + 5).toString() + " " + (style2.y - min.y + 5).toString() + " ";
        return (
            <svg className="microflow-flow" style={{ top: min.y - 5, left: min.x - 5, width: max.x - min.x + 10, height: max.y - min.y + 10, position: "absolute" }}>
                <path d={path1} stroke="black" fill="transparent" style={{ "strokeDasharray": "4,4" }} />
            </svg>
        )
    }
}