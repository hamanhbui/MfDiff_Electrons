/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class RetrieveAction extends React.Component<{ data: microflow.IRetrieveAction, style?: any }, {}>{
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI8SURBVDhPpdDdT1JhHAdw/xu76Kqti2pddddFV27dNFu5ttZmm12VUGN1kVKWWJEKR2GTpiYg72+CgHCOCELyogaJHORlE6J4rIas/MY5ayDTC10Xvz3n99vzfL7PczoA/FcdO6TMibyeThNTIEPs4R1iCWaJntkmxkZvYFii9aWJzBTPc3uPBXT+L3uNFalMAQ5/FE4mDheTgGExjGCMRb0OqD0pbk87cCj5wPUpB2soC/VSCjp6C8ZlFtqlLciMUZQrdUw7N8kR4CTJGm8KhWINk8a1FnCa5FnXZ1QqB5DOBVrAaZKVpiiqVeC1ytcCPro3uAbhRAbXH4ygf3gGkY0MZi1BUBpfW/KoZgWRRBlixWILmLLx70GxVMVt4TheKaxci2/ffyMUy/PJ3rHzYCYu8cV9D1COFjBpCPEAm/+KHqEMAskcmAiLafMqQvEi/PIL+LkuRjUiwi7dh4L7Dj9rAu/VDA+kc2Ue6BtQYX5hDYOUBZ5gBpahM1jXXEPW0Q3WdgOrU1f4WRMY/uDmgZ1iFT2P5RhS2EB+cDf6BTqcA01dbBzobCtu1gReKByktv8HzuVNXL0rxr1nSnhWtmH1JfF83MwfIJGHKNH3wdpvIqnvguVlZwsYnLDt1faBBSaJ0RkvKDUNjT0G5XwQKn2YTyNhDugF6/gHHH7CLYE8L5LqyJO3WvJ0zEhE7/Skf0RLBBItEb7RkaShq3GDRygxvcjau48CJ6mA4jL/593Sc3BIzjZG3BwdfwGJaR8JmHGtegAAAABJRU5ErkJggg==" />
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