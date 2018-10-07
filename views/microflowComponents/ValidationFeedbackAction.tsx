/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class ValidationFeedbackAction extends React.Component<{ data: microflow.IValidationFeedbackAction, style?: any }, {}>{
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIkSURBVDhPpZLta1JRHMf3D/RPFEUPRLXe9Af0sje9CWv1YjRitJHVlkOt9TBMqbRNRqOoUSLF0mBWK9rS9N5Js41iD5X5sM18uFPvrpPcmSby7ZxbuF2SQDrwOQ8cfp/z+/04DQD+G3k6fG6ozeyKFvRPItA9pthD0NqC0Dz8jAuDc+h4MIOzdz9CfWcS7f0B6O6NF1iMQmJwRivWN0uoB3Wvr6KQsAzq5dRNLw3dINHZwyCE1MVJo1spYbWv5PMK8hSe56tMcY8Q9JyHnxuV7453jyglrHmSlIOqZ6aKlJPkYDYqZYLv/k4shx3IfrUhJ0k4dvE5u1qXdNyfhiiKyP6B7cXs+jk+baPBdpQLEQRfNEFYmIRKN6yUqAemkE6n/4Jl8t7rwpfhoyhmX6KYskCKjiA0psURzVOl5Ez/BwiCoCiHnXmeQyJghvjNiWL8GjjTfvxcduLT4EHor5iUknbrBJLJFCWJFIWtjMXZUSy49ShlbCCRZnDGfViLdWFl/hVe3z6EQN+BTf+WxGOYdbYgR5u5ttiJ1ZDqN+ETtKxexHxW+G80dlcl9AsPtVp4+QO1mDxoNozBfOs6YpwFpaUBOYvVcBMtp1FeyfxpEMEFrmd32nd1105ZUguaaoKIUZQkN4oZ2pOMYwPPUP4xh8SEHR79NkdNAYOmKo4b9xLesIfQFwl9kXgv7yDvLm0nNJC4tVuJu2sLeavZzNcU1AcafgHhL02D1HTq1AAAAABJRU5ErkJggg==" />
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