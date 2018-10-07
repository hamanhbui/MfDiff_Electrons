/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class CastAction extends React.Component<{ data: microflow.ICastAction, style?: any }, {}>{
    render() {
        var style = {
            top: this.props.data.geometry.top,
            left: this.props.data.geometry.left,
            height: this.props.data.geometry.height,
            width: this.props.data.geometry.width,
            position: "absolute"
        }
        for (var a in this.props.style) {
            style[a] = this.props.style[a];
        }
        let fillName = findFillName(this.props.data.backgroundColor);
        return (
            <div className="microflow-wrapper" style={style}>
                <svg width={this.props.data.geometry.width + 2} height={this.props.data.geometry.height + 2}>
                    {linearGradient(this.props.data.backgroundColor)}
                    <g transform="translate(1, 1)">
                        <rect className="mx-mf-action" x="0" y="0" rx="12" ry="12" width={this.props.data.geometry.width - 1} height={this.props.data.geometry.height - 1} fill={fillName}></rect>
                    </g>
                </svg>
                <div className="mx-mf-activity-content-wrapper">
                    <div className="item-wrapper">
                        <div className="image-wrapper">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK+SURBVDhPpZHbT5JxGMff/6zrLqyLbrpwHS6sPJSWmpu5tJwoSZTmCZdHBFTAA6jEQQRKcBhKGAL2CoryCooCBvIThG+vbLlIL9r6bd/t+W3P89n3+zwUgP8S1a1wxIRaNxHrPWTcRJNxI03G/tCogSZCrYcMaVykS7EWuwQY0jhP2QJJcgrfTgh+JoyNrSAcbj++uXewTgexf3iCxAnQr/p+3psP6Jt1ELbA3kEU/ME5FNZ0ob5DDpHSgk6JDrXvpLCu+fEzDgiU9vPefED39Ncc4PxpFh24/oCL/glT7h9PZKHQO/DZ5kMkmkWHPNebD2iXWi4ASoMdBSU89I4bETs+w2EkDRcdhnvzCHuhFPgS82UAT2S8AEzPr+JGKQ+c3hks2bdhDnphD3uh89ug2rJCtmGClJU1tAUT40XfujlBcQbmydkZkGUBk7oV3Cx7i+e8Ucg1duh3XThI7KNijoNaHR9qnwldyxJofBbQ0QjEHitDNQhUhKSAdBqQaVdyEbpGFxAMp6HctCGdOcM9eR2eqVsRTyexHmZg3nXDwmxD4FgIULXtU+QkmUUmw0ZgF1bARugZM7Gny0C8bkCKBTxUvEaxsgn67VWInfPwHIVzAP6yMkBV82UkepzOnaqatX7t7isU1fehZ9SE7hUlCAt4pGjE/YmXEDk1eGMegfMghMVdL5rNsgBVwZWcxhOAx3sIg5Vd2BINzZcf0Jm94JpFSKZTuCOrQ8WnVjDxJFZDu5ijbayTRdQbhQHqdlVnrKRxmJQ2DZPyZhEp54rJE46IlHFGSJ2+F3RkD4XSFyiaasSUx4Je+yy7yGlMemwsYJDJu+nfeqp+j3HXAutkBC2LwpyjBuMAPto1EKyoUTLDS1w5+FvFMy2o0bYxVdoPgUp1W6BMxQ88nuUFKrUdzANFS/SWqMZ25eC/C9Qv8HUlnvgR+C4AAAAASUVORK5CYII=" />
                        </div>
                        <div className="text-wrapper">
                            <label>Cast</label>
                        </div>
                    </div>
                </div>
                <div className="result-item-wrapper" style={{ top: this.props.data.geometry.height }}>
                    <div className="result-text-wrapper">
                        <label>{this.props.data.value}</label>
                    </div>
                    <div className="result-type-wrapper">
                        <label>{this.props.data.returnType}</label>
                    </div>
                </div>
            </div>
        )
    }
}
