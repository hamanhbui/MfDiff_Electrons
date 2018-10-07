/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
export class SequenceFlow extends React.Component<{ data: microflow.ISequenceFlow, style?: any }, {}>{
    render() {
        var originPoint = {
            x: this.props.data.origin.geometry.left,
            y: this.props.data.origin.geometry.top,
        }
        var destinationPoint = {
            x: this.props.data.destination.geometry.left,
            y: this.props.data.destination.geometry.top,
        }
        var originBenzierPoint = {
            x: this.props.data.origin.geometry.left + this.props.data.originBezierVector.width,
            y: this.props.data.origin.geometry.top + this.props.data.originBezierVector.height,
        }
        var destinationBenzierPoint = {
            x: this.props.data.destination.geometry.left + this.props.data.destinationBezierVector.width,
            y: this.props.data.destination.geometry.top + this.props.data.destinationBezierVector.height,
        }
        var points = [originPoint, destinationPoint, originBenzierPoint, destinationBenzierPoint];
        var pointMin = {
            x: this.props.data.origin.geometry.left,
            y: this.props.data.origin.geometry.top,
        }
        var pointMax = {
            x: this.props.data.origin.geometry.left,
            y: this.props.data.origin.geometry.top,
        }
        for (var count = 0; count < points.length; count++) {
            if (points[count].x < pointMin.x) {
                pointMin.x = points[count].x;
            }
            if (points[count].y < pointMin.y) {
                pointMin.y = points[count].y;
            }
            if (points[count].x > pointMax.x) {
                pointMax.x = points[count].x;
            }
            if (points[count].y > pointMax.y) {
                pointMax.y = points[count].y;
            }
        }
        var path1 = "M " + (originPoint.x - pointMin.x + 5).toString() + " " + (originPoint.y - pointMin.y + 5).toString() + " " +
            "C " + (originBenzierPoint.x - pointMin.x + 5).toString() + " " + (originBenzierPoint.y - pointMin.y + 5).toString() + " " +
            (destinationBenzierPoint.x - pointMin.x + 5).toString() + " " + (destinationBenzierPoint.y - pointMin.y + 5).toString() + " " +
            (destinationPoint.x - pointMin.x + 5).toString() + " " + (destinationPoint.y - pointMin.y + 5).toString() + " ";
        var polygon1 = (destinationPoint.x - pointMin.x - 10 + 5).toString() + "," + (destinationPoint.y - pointMin.y + 5 + 5).toString() + " " +
            (destinationPoint.x - pointMin.x + 5).toString() + "," + (destinationPoint.y - pointMin.y + 5).toString() + " " +
            (destinationPoint.x - pointMin.x - 10 + 5).toString() + "," + (destinationPoint.y - pointMin.y - 5 + 5).toString();
        var oppositeEdge = destinationPoint.y - destinationBenzierPoint.y;
        var adjacentEdge = destinationPoint.x - destinationBenzierPoint.x;
        var alpha: number = 0;
        if (adjacentEdge) {
            alpha = Math.atan(oppositeEdge / adjacentEdge) * 180 / Math.PI;
        }
        else if (adjacentEdge === 0 && oppositeEdge != 0) {
            alpha = 90;
        }
        if ((destinationBenzierPoint.x > destinationPoint.x && destinationBenzierPoint.y < destinationPoint.y) || (destinationBenzierPoint.x > destinationPoint.x && destinationBenzierPoint.y > destinationPoint.y)) {
            alpha += 180;
        }
        var rotation = "rotate(" + alpha.toString() + " " + (destinationPoint.x - pointMin.x + 5).toString() + " " + (destinationPoint.y - pointMin.y + 5).toString() + ")";
        return (
            <svg className="microflow-flow" style={{ top: pointMin.y - 5, left: pointMin.x - 5, width: pointMax.x - pointMin.x + 10, height: pointMax.y - pointMin.y + 10, position: "absolute" }}>
                <path d={path1} stroke="black" fill="transparent" />
                <polygon points={polygon1} style={{ fill: "black" }} transform={rotation} />
            </svg>
        )
    }
}