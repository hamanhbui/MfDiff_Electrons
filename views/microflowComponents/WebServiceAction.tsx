/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class WebServiceCallAction extends React.Component<{ data: microflow.IWebServiceCallAction, style?: any }, {}>{
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAmhJREFUOE+1kt1P01AYhxvjlRca443x3n/BW7nwxhBmCHbtwBhjxIEKaGBhawfiEMdkgbB1yAAtLbAtbCwxM5ng2AoTQcZHIHDhBx9LJAozkSgfCzBe28MhZIp65ZOcNCd9n9/59aTEf4FkhXNqVqihGNFNM0IHbRCYHB1/Fr/+MxeLbMcpVniWV9EZr3dFIoGB6SFbZ99ro/25pDF2fKEMYmVGRtVRPJ5Opr7pJM2Ic6bWPmlrO7UBMsuJb9AbnYDZD3FYXEos36nrGaEYIUwQVUewdoBS1cyHIoq4T1Aag6pGF5jsbmjvCYHg7wetuXtMzYilWNuDNIjn8yo757d3UpvYhY3NJJJ/XcGBiSWNUUyQOv401glCruV42BZMOz2Z3ILaZu9vAdWcBwrNnlG1QczHOgoIsfVdw3Pxz0heT67B+EIM3s1/gtj0e/AEBtNCdFZ3hGLarVhH3y8ZG7pGw2+m4O3HYch/eg0oezYKU1CC9mWL0wc2jxShDWIj1pUGIl9S5xxiPQxo+evQEnOggPBsCBZW5mH1+w9UXQmwtvqh2OoflluXYJ0g1HW3WnI5dYoJ6Hadkxy0TTWBRaoGne8uCrzRehXK7Y0ooH9kalW+xJW0H0s5reJVOZiHHhy6mGAZalTabAK9/cVgWn0Fmsu+TTty1ou8Bbs10ft70ssyKPYWoFXiK4Sibi0KoUyPlrJuOo9h9QCVRXVGw9HRK82aHbZXh4Ydvc6vXPBJgu0yL+Y+1icoy72ZbINwCiuHQzZcuqzhyDUlgGaFGfmyJuWnS83yWXjk35C1F06QNlUm3v4FgvgJ/iy97T1EbGYAAAAASUVORK5CYII=" />
                        </div>
                        <div className="text-wrapper">
                            <label>{this.props.data.caption}</label>
                        </div>
                    </div>
                </div>
                <div className="result-item-wrapper" style={{ top: this.props.data.geometry.height }}>
                    <div className="result-text-wrapper">
                        <label>{this.props.data.variableName}</label>
                    </div>
                    <div className="result-type-wrapper">
                        <label>{this.props.data.returnType}</label>
                    </div>
                </div>
            </div>
        )
    }
}