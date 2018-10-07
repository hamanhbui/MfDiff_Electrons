/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class ChangeVariableAction extends React.Component<{ data: microflow.IChangeVariableAction, style?: any }, {}>{
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ/SURBVDhPfZBNbxJhFIXnL7hwY6LGuDHpHzAhXajRtC7caBNjY7vAj5ho3Nla48I0ja1ookYroWJrTNUAobZRG8tHQEC+hAIz0MYixSlkqIjWYmekw/T4voOSINrFWcyde55z7sskk0lwHIdEIoF4PI5YLIZoNIpIJIJwOLwVALOZGJZloShKk3K5nAoJBAKbQhiaTA08z6vJ2Wy2DqEz0gJer/e/EIZWpss0jQ5CoVCkXC5DlmV1ToF+vx8ul+ufEIam/lkk5gqpzEuShEJZhmOp1iSTycDj8cDhcDRBGJpMl6iq1Sqo+fOaghuzG+h/D9j52r90Oo2Q7S7mx49jYXIAMeMhxO+3dDHkRrFYLKpL6+vrEEjyUHQDwxxgSAK62RrkR24CgrMHK4mXQDmPbwkL/DfbCkwwGGwlN4rLy8sqhC3KarKeAB7NASMp4Pm7Vyglr6GyNAXBpYPIWlHNesGOnpHUO3w+n4bcKBYKBRWS+iJjMKJATxpMRd0ocVehiF6IH8+jFLqAuSdacsIpuEcu7q0/htvt1pCXFgVBqEPGvE58ZS9DkfxYS3dD4juxmupDZvQIbBOPYbFYdtYBVOSVNXa7Xczn88hzLyCEe36buyB9OoHv3BWk9YfhtBqpeRf1NACoZmZmNNNP+yupN5dI7beQFrX4yZ/ECmmy8KANtqlnMJvNqpmqCfDw3HZt8nUf4tO3kQt2YG2xE6VYLz4YSO3J8QYzVYOZyjR0AFjNYt5wDM6+bfDp2+HRHYTNOtZkpmr4oOo/3SJX/PdQCd5BcGAfTGd3Y9pshMlkajJTNQ06WrdI17v3yI7Bdtl+a7/bOtx7lJh3/L1XE5hfmSEmqBbVU2MAAAAASUVORK5CYII=" />
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