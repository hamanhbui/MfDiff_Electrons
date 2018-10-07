/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class CommitAction extends React.Component<{ data: microflow.ICommitAction, style?: any }, {}>{
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
            withEvents: this.props.data.withEvents,
            refresh: this.props.data.refreshInClient,
        }
        let fillName = findFillName(this.props.data.backgroundColor);
        function Action() {
            if (action.refresh === true && action.withEvents === true) {
                return ([<img key="2" src="https://cdn.modelshare.mendix.com/img/MicroflowActionHasCommit.png" />,
                <img key="1" src="https://cdn.modelshare.mendix.com/img/MicroflowActionHasRefresh.png" />])
            }
            else if (action.refresh === true && action.withEvents === false) {
                return ([<img key="2" src="https://cdn.modelshare.mendix.com/img/MicroflowActionHasCommit.png" />,
                <img key="1" src="https://cdn.modelshare.mendix.com/img/MicroflowActionHasRefresh.png" />,
                <img key="3" src="https://cdn.modelshare.mendix.com/img/MicroflowActionWithoutEvents.png" />])
            }
            else if (action.refresh === false && action.withEvents === false) {
                return ([<img key="1" src="https://cdn.modelshare.mendix.com/img/MicroflowActionHasCommit.png" />,
                <img key="2" src="https://cdn.modelshare.mendix.com/img/MicroflowActionWithoutEvents.png" />])
            }
            else {
                return (<img key="1" src="https://cdn.modelshare.mendix.com/img/MicroflowActionHasCommit.png" />)
            }
        }
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwQAADsEBuJFr7QAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAACd0lEQVQ4T6XR7U9SURwHcP+uttZr18z1rhc1tzaz1EUzNfWF1lQcDUmdSujEFHlGTDFsgKa3B5iSyEXx8qAYZmLIBRTxKMi3Cy9uOm2rdbfvzjn3/M5n53dvEYD/ypUv/yX8RDpFJxVWhqjmfERHBYluIUi056KZDxKF1UdGLOukf8qTvASMWNZOuBHH5ASh7T2Ef+zDvxUBzYThZrbhDUbwM5bGURqQz6zmay8CQ+9owo3YjSYgeWPG3Wf9aOkdh9JkR5/ahqZXeix6wjhMATLTSr72IiCddBaA/GP5TKP4gQhyI1VYp45ymJqj8fFrCPFEDr3jhdqLQI/ezgOm+RWUVIoxoFtA8iCLWDyD9eA+mA0Wu3unkKi/XAbEygUemJx14VaVGMKBadxusYtalcyaSLseE6q9caHKG3+pYRI1Upf7usBSygPC4VmSzQI5bjFhW0ZpdSfqxRrUDXo3QjEgw210Gpi8X5gvBdN41O38zgPPZTOEnHKbGcBgXS600K/5gOpeT4xiSOHQ+ejtLMo7l1I80NTzlqSPczg741rgPlgJ18JrLYUa2Ro7PBtFlzEA+fstLpuQGPyQTHxDmcjB8kCdxEASB5nCr6rjrn6j7AXKW4ZQI3Wz3aYIng7uoFkRRaM8AoE0hOaxAO4Jqd/AE5H6JHUE+DZjmF/chM0RhOVTABXdK3GjIwnK54J51YppjxWU34VBcxiljZY4D9yp7UtWto6SqvZRIuhQEoFIRR4LleRhl/vQuZGFK6qB0d8AY6ARHlaPCWoXN2vNSR74U4obKG29jN7pUNGJtjEX2zbqZNsVS+x9oS1xrULnuPLQ3wdFvwDjoxx5tGPcfwAAAABJRU5ErkJggg==" />
                        </div>
                        <div className="text-wrapper">
                            <label>{this.props.data.caption + "'"}</label>
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