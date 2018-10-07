/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class CreateObjectAction extends React.Component<{ data: microflow.ICreateObjectAction, style?: any }, {}>{
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
        var action = {
            commit: this.props.data.commit,
            refresh: this.props.data.refreshInClient,
        }
        let fillName = findFillName(this.props.data.backgroundColor);
        function Action() {
            if (action.commit === microflow.CommitEnum.Yes && action.refresh === true) {
                return [<img key="1" src="https://cdn.modelshare.mendix.com/img/MicroflowActionHasCommit.png" />,
                <img key="3" src="https://cdn.modelshare.mendix.com/img/MicroflowActionHasRefresh.png" />]
            }
            else if (action.commit === microflow.CommitEnum.YesWithoutEvents && action.refresh === true) {
                return [<img key="1" src="https://cdn.modelshare.mendix.com/img/MicroflowActionHasCommit.png" />,
                <img key="3" src="https://cdn.modelshare.mendix.com/img/MicroflowActionHasRefresh.png" />,
                <img key="2" src="https://cdn.modelshare.mendix.com/img/MicroflowActionWithoutEvents.png" />]
            }
            else if (action.commit === microflow.CommitEnum.Yes && action.refresh === false) {
                return <img key="1" src="https://cdn.modelshare.mendix.com/img/MicroflowActionHasCommit.png" />
            }
            else if (action.commit === microflow.CommitEnum.YesWithoutEvents && action.refresh === false) {
                return [<img key="1" src="https://cdn.modelshare.mendix.com/img/MicroflowActionHasCommit.png" />,
                <img key="2" src="https://cdn.modelshare.mendix.com/img/MicroflowActionWithoutEvents.png" />]
            }
            else if (action.commit === microflow.CommitEnum.No && action.refresh === true) {
                return <img key="3" src="https://cdn.modelshare.mendix.com/img/MicroflowActionHasRefresh.png" />
            }
        }
        return (
            <div className="microflow-wrapper" style={style}>
                <svg width={this.props.data.geometry.width++ + 2} height={this.props.data.geometry.height++ + 2}>
                    {linearGradient(this.props.data.backgroundColor)}
                    <g transform="translate(1, 1)">
                        <rect className="mx-mf-action" x="0" y="0" rx="12" ry="12" width={this.props.data.geometry.width - 1} height={this.props.data.geometry.height - 1} fill={fillName}></rect>
                    </g>
                </svg>
                <div className="mx-mf-activity-content-wrapper">
                    <div className="item-wrapper">
                        <div className="image-wrapper">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJWSURBVDhPpZHfT5JRGMf9N7rsrpvauuqqdddmy2zrojbbUpe2gYsuNJu1zDUR9BUaExUWlBiCP6j4Ea4XNKRSZ2kEpFCEiU0xIYFADoJ8e9+3YjHcqnW2757znH2fz3mec8oA/Jf2PPwXFTZ9Jnd80OYjQ5N+MuIMkJGpABn+TXpHgAza/GSAXiK9Jk+8BDBAv8swEWmSwfLqBkJrEbz/FIbbF8Jb3yoWA2F8iW4jtQ2ox72stxigeuImTMT6ZgyS+1acb+5Fa48BWvMM5Do7WqSjmPOE8C0JKMwu1lsM6DO+5gDsol+6UV4vhvqhk8uTqTxMk248n1/GViyPHgPnLQbIRmcKALPDhQoeBeXIFOKJHKJbWSwFIvB9/Ir1jR1IdNOlAEo7VQAYJ97gFJ+CUGnBrGsFeus8M8orbEbzWPlMINI4SgHCexMklwPyTPLIvoDKhm5cpfQw0C50qsZxU9mFRkUN6iWVqGo/jvJrh24UAW4pxgnZAbJZYMy2wI3Qq3+GcCQLlUWNttEaWLxyuNZoSG08nJUexBH+PqoAaJE9JtvpPHZ3mRGYB6tgRugfdjJft4vazhMweu7AuChjrABlr4PUfokFpAuAJskYiSWy3Fc1Ma0fu9CGulYV+vVOnLx+GFbvXa741zK55SzgRzGrK2JdJpkC/MEoHHNB2GcDoF98gH06iKOC/eiia9FBV3PFHU+rSzs41yiP825rCL9dQwQdWiIQD5HLQi1pED4gp5urcmeoA+imL3I3s5HNi97gT2LMIkYJtu2fUcSe72n+e6HsOzx9BOSqTKTtAAAAAElFTkSuQmCC" />
                        </div>
                        <div className="text-wrapper">
                            <label>{this.props.data.caption}</label>
                        </div>
                    </div>
                    <div className="image-changeaction-wrapper">
                        {Action()}
                    </div>
                </div>
                <div className="result-item-wrapper" style={{ top: this.props.data.geometry.height }}>
                    <div className="result-text-wrapper">
                        <label>{this.props.data.returnName}</label>
                    </div>
                    <div className="result-type-wrapper">
                        <label>{this.props.data.returnType}</label>
                    </div>
                </div>
            </div>
        )
    }
}