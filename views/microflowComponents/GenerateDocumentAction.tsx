/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class GenerateDocumentAction extends React.Component<{ data: microflow.IGenerateDocumentAction, style?: any }, {}>{
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHwSURBVDhPpZJbTxNRFIX5PxJefPGJQLgYakunTMtFhEkjCS+m2FIBZVovmIZLg4VKoilJFaE0WDQaLqEpRAgIdDoEX5Rg4j9ANOHB+NDl2XsKDQRNKjtZs7LOnv2dM5ciABcSX5TwjlsoJJQRghLWs8qoDiWUgVP4zbAO54gGZVg7bBtNa0Nv9jCU+CJG84AIpUJqYOYz2Qlgj9L4+sGJIv8QlTP48ZewHGBE/0GLNLi6f8Ra+3q+jgGNj1ezwgxAayjzmxbP7vQ3UTU8XCEzAC3DGtEKKoc/RWYAbgTTFGC/n4LZl4RJTXI2R6rRFJfRELPBMWmFPGGBFDVxz64ukRmA5sEtCijrWkRf7BOudC5wborXwad1stS0B73bt2EZv8o9uYfvMQDX+zcp4LJrDv6pXZTces+5fkqCX/OeAtQ8r+SerYvvyZ0gsEEBxe1vceeFjktts5ztr2rhS4sTiGF12417Wx2oHivnnuRJkOVOEFinwABvNA+Qotd4VxIN92y6UBEu5Z7VHSczAI2P1vgrEICGjwEtr+v5Bda9NMMsnr3mWSWqnpZxr7ZjOv8fOB58+MarBZTFFaMfIgfwrTyxq8vzcm/qu3w3CVv3gnhJc5C872D1zIrjzogd42JomgazFtfkT+H03Abg/4WiP4OBEDonQJozAAAAAElFTkSuQmCC" />
                        </div>
                        <div className="text-wrapper">
                            <label>{this.props.data.caption}</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}