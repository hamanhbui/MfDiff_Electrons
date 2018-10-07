import * as React from "react";
import _cpnInterface = require("./interfaces");
import _cpnTypeEnum = require("./interfaces/TypeEnum")
export class OverviewBar extends React.Component<{ propotionWidth: number, data: _cpnInterface.microflow.IMicroflowObject, hightlightStyle: any, version: string }, {}>{
    render() {
        let style = {
            position: "absolute",
            left: this.props.data.geometry.left * this.props.propotionWidth,
            width: this.props.data.geometry.width * this.props.propotionWidth,
            top: 0,
            height: 8,
            backgroundColor: this.props.hightlightStyle
        }
        if (this.props.version === "older") {
            style.top = 8
        }
        return (
            this.props.data.type === _cpnTypeEnum.TypeEnum.LoopedAcivity ? <div /> :
                <div key={this.props.data.id} style={style}>
                </div>
        )
    }
}