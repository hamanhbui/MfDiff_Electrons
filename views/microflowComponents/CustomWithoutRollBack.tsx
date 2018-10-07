/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import _cpnInterface = require("./interfaces")
export class CustomWithoutRollBack extends React.Component<{ data: _cpnInterface.microflow.IErrorHandler }, {}>{
    render() {
        return (
            <div style={{ width: 20, height: 20, backgroundImage: "initial", backgroundOrigin: "initial", backgroundClip: "initial", backgroundColor: "transparent", borderTopStyle: "none", borderRightStyle: "none", borderBottomStyle: "none", borderLeftStyle: "none", borderWidth: "initial", borderColor: "initial", position: "absolute", WebkitTransform: "translate(-50%, -50%)", left: this.props.data.left, top: this.props.data.top, backgroundPosition: "initial initial", backgroundRepeat: "initial initial" }} className="_jsPlumb_overlay " id="jsPlumb_2_38">
                <svg version="1.1" width="20" height="20" className="mx-mf-errorhandler mx-mf-errorhandler-CustomWithoutRollBack" xmlns="http://www.w3.org/2000/svg" >
                    <linearGradient id="gradient-mx-mf-errorhandler" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0" style={{ stopColor: "#ffffff" }}></stop>
                        <stop offset="1" style={{ stopColor: "#F7931E" }}></stop>
                    </linearGradient>
                    <g>
                        <circle cx="50%" cy="50%" r="9" x="0" y="0" fill="url(#gradient-mx-mf-errorhandler)"></circle>
                        <image x="2.5" y="2.5" height="15" width="15" href="https://cdn.modelshare.mendix.com/img/error_continue.png"></image>
                    </g>
                </svg>
            </div >
        )
    }
}