/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class ChangeObjectAction extends React.Component<{ data: microflow.IChangeObjectAction, style?: any }, {}>{
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKNSURBVDhPpdHdT5JRHAdw1n1bf0EXrbvWXV5UtnXXXJlruuZWbl40LTBXib04rUxh00hSFCdLDY0glFRAXeAbFFJIiDwlQqSCpYaSYAgHEb49ckE6Wqt1tu/O6z47v3MYAP4rv138lyQHzUpboFM7Q56POIhc7yJynYu82BHZmIt0ah1ErLEToZIKpABizccI3SNMIphb+AbP4iqc88uwzXgwNbOAadcyvL4QNkJA2+CH7bO7gdZ+G6F7LK34Ufd0ABdvCXGvUQGJyogm6RDK+F0wUR78CAItKuv22d1Ac585AWw3jcGGjIIatL3UJ+bBjTiUIzYYzNOYG67GuPh23NqSprA/OXw0CTR0GZOAasyKTCYPIrkOgfUt+NaisLu8mH1diSWdEJHFKXzqLYHxYXpvEuBJdEmgb3gSZ1k8cEVqvLW6IRt4D4u2FCG3FN9NIoTsA/BbFaDaC61JgNs+TLa2gDg96RmyIKvoEW7yZFBoJjGuZoKsqLC5VIm1yctwPsuHRXhebBJkH0wC91sGCdkEolGgW2tJlCCUjcIzUY2Ir5++djnCnjz4jCxoBAWxCX7GnneCnF+PWNbQS0LhOGIxugT6wTLpEtTtLIS8amwu30XYnYdVw1VQ0nLcaegj5vozjF1AaV038a9HE19VweGBX5EN+2g9/J/ZiHzJx4qhCKONTLjmw7heK08FrtVII8ENwDHrQ3f9BXgpJdwKNvTcAzC1noZOdANmygfP1xhYHEkkBchlNwWYVR2Exekg5ZfS4mZxMYL6Wrx5cAJNJVmxYq6EXKH3CyvFJJctDKQAO5OTvq+HfW4/9Yp7ihqqPSlQlR7aa6w6wnA+Tmc4+McZTv4xxh+Bvw8YPwEeePkqV3cDgAAAAABJRU5ErkJggg==" />
                        </div>
                        <div className="text-wrapper">
                            <label>{this.props.data.caption}</label>
                        </div>
                    </div>
                    <div className="image-changeaction-wrapper">
                        {Action()}
                    </div>
                </div>
            </div>
        )
    }
}