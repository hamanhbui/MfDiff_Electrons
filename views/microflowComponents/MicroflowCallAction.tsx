/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class MicroflowCallAction extends React.Component<{ data: microflow.IMicroflowCallAction, style?: any }, {}>{
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDhPpZJbTxpRFIX9I33kd/QVS0wak6ax6UtDY9HaaQWFEhUJ1YACU1qEwSIiV4erAlMERAJCkQHtPDRNX5r+iUmqBcLqDI2+ME16mWRlTvY561vZ5+wxAP8lyeLf6GZx67Z6KKMzJRNE6u0xTmOJ8mpzhF/c3Of09jiptcZk1+ckASZXWrFExlmrj0EgXUX6uI1EgQVFn2DVeQBiLczOW2iFJEBMFs2uSBGFOgemeoHD8jmSxQ7ooxZC2TMYXRlMrwbZJ8aQTApAbnpzyNc+Ilu5wEG5g8urLtqfviGQaWIn1QAVq4Mw01AuB8kRgM5GczvJKjKVc6RKbSGVxWAAdHt9lJpfsEXX8Dpchd6RxdSijxsBPF8P87H8GRLFNqL5FgLZJnr9vrD1C8KcfobFV8ayu4BJYpu/9t0A5l6F+JBgiuRa2Dv8AG+yMTSKn/ivdL7C6ClB62Aw8ZQaBRDrYc6+V4Iv3YAnXodzvya0MMDVj96whRUhWf/2CNOmuADwSLRgjpJaWwLu2CkcQq/WvQq+X3aH5qWtAnRv8lCTDO5p/JiYezd6ibOmiEy5EmA11hQ2/CdY8x7DQBWhd+ax4HiPFzYGUy+DGFdR7PiMZ/QZxeF4bAgpHup2WaUhjGeWFDRkDsRGFo8MNCbndyFXudk7sx7pQRKLoh5o/bL7Cz7yLrHNKWbcvFzl4oVUTjCSchX1+1H+V0kW/1wY+wkEhcVo4zgV+wAAAABJRU5ErkJggg==" />
                        </div>
                        <div className="text-wrapper">
                            <label>{this.props.data.caption}</label>
                        </div>
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