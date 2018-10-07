/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class ShowPageAction extends React.Component<{ data: microflow.IShowPageAction, style?: any }, {}>{
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAByElEQVQ4T2P4//8/RZghsHBldu/Gu1+ql9/5X7UMiJfc+l+56Mb/sgVX/5fOu/K/eO6l/0Wzzv8vmHnuf/600/9zppz8XzXryBeQPrABrWvu/p2088V/UnH+hIN/wQaAbCYHp3UfAOoHGlC15Pb/b9++kYyT2/dCDKhcfPP/169f/38B4y//v3wBYiD78OHDOPFXoJqE1l1QA4AB9unTp/8RzZfg+DOQD1KIC3z+/Pl/XON2EJOBARTaHz5+/P/xAxB//AClP+I1ACQfU7cVxGRgAEXVu3fv/79//x5Mg/H7d0D6HVAMQsOwdjM/GN97euN/VM2m//otzAwMxXMu/n/z5s3/11AMYr95/QbFzzAM0hy6whJC1876b9DCwsCQP/3M/5cvX6KEAYgP0gACMFtheOGxDrghuk2MSgx5U079f/78ORC/gNIQjGzAxvOz/s86WP9/0r6y/81bUv9PA7JhhjDkTDrx/+nTZ0D89P8zIAbREAwRI2gAME2vzOg7DE5ZKR37/ie27v4f37wTGMpbwAEFUoSMMbwAdCXRGKQJptmxV1gZHIjYFCLj/KU2DFmLTBkyFpqADQDhiJlqMq79Egz6LcwMAEP5+e7OHUP9AAAAAElFTkSuQmCC" />
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