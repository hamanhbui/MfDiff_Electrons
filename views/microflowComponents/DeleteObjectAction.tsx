/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class DeleteObjectAction extends React.Component<{ data: microflow.IDeleteAction, style?: any }, {}>{
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
            refresh: this.props.data.refreshInClient
        }
        function Refresh() {
            if (action.refresh === true) {
                return (
                    <img src="https://cdn.modelshare.mendix.com/img/MicroflowActionHasRefresh.png" />)
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJxSURBVDhPpZHdT9JRGMdt4B/QVW2tCy9aW1v/QVst86IL8qKL2mrVVrYmptVCjYuotSgd2sZ8QReWGvLzBUtJUQRD8m2+hVgKhZDgfAUF4+Ug+Pt24OJXTLdqPdt3zznPvs/nnOecNAD/pT2L/yJuUd1pDTT22UhTv520mB2kZcBBmn8TY3KQxj47qdfPkarOmcAuQL3+S5RmREgULs8q3EtefP2+AqvNjWmbB7OOFaz5wgiFgTrd54Q3FaDsshKasbzuR/nrblwuqoKkQgOVdgSVagPEL1oxNuPGjyBQo7UkvKmA6o6JJCAR+iErzt4sQV27ObkPhlh09lvxcdKFTT+LCk3SmwqQt45wAK3JAkGuDLUtAwhsxeHbjGHO4YVtfgPLq9soVw/vBshUAxygw/gJ54QySGvfY9SyAKZ7ko4yjnUfi4VFgucNpt0A6SsjiccBlm7eGqaQnVeGQhkDjd6CUqUO6od3MXTtGAyZ6dBmH2B7s3jFKYBHNTpCtoFYDGjrm0qOUMV8wIo3homXMkyLTiDSVQZ2tgch5h7Ghcfj+kz+bQ4glr8j4QiLnR06An0wAR1B0WymX7cD06UjCNNmyAVA0X5AmoH10lPoPcNzcgBReRvxb8WSXyWiVz959TFyJEooGDMMp9PBTrZT26/YlBykdT7LAe6UqKPBEGB3+mAac8Iw6oB+8BsMw070nj+EoPI6QJtIYRo2qBZu8UDfYZEDXLxfGch90kCETxtIwTMVKShpIvlSFcmTviGK/Cvx0ZyjWCrKwNqDdMzf2AejgB/vyeKJOcCfNHjhcDE90ZW4Ns2eRHOivqf574W0n3VkA6FhkJAiAAAAAElFTkSuQmCC" />
                        </div>
                        <div className="text-wrapper">
                            <label>{this.props.data.caption}</label>
                        </div>
                    </div>
                    <div className="image-changeaction-wrapper">
                        {Refresh()}
                    </div>
                </div>
            </div>
        )
    }
}