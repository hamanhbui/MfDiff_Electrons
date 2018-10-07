/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class ChangeListAction extends React.Component<{ data: microflow.IChangeListAction, style?: any }, {}>{
    render() {
        var style = {
            top: this.props.data.geometry.top,
            left: this.props.data.geometry.left,
            height: this.props.data.geometry.height,
            width: this.props.data.geometry.width,
            position: "absolute"
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ7SURBVDhPpc/rT1JxGAfwM/+U1tveVVtqW2+7vMtZWzktmzkrt8pyKTnTLopTIYtSQbFZeTui3NQUVBSOwhFBdCCkctQD5d1jQy7RNzxbF0cvcr549tvz27PP93kIAIequA+ZdoZVmuY5zbiX+2Rd4nosi5ySWuDUsV5FMZxidJ6r10yzv+bjgG7j553YC4/Xh37jFHTUNPTUDFSDVlgcDMJhgBz27M3sB/5K/qG3LaOXXgQ54kG3aQ7qMQaKkTnUq6ewthFGi87FxQH/k9xp8MDnD6JRbf8DHCSZ1NuwoHsKkzw/aqs9QTqlx04dIDkAsyYf/mEJQj47PF33QVUkdxHtQ869dWCd8eLSvZcoELVi0ulFW48Fss5RPrlNP4uv9hcIMB+xYa5DwKnFlo2Eo/GmjWju4++Bf3Ub1wV1qJL37rXY3PoO2sHyydaBPARXVQj7n2BzMhvu5gxYJalN5pqLR4lGFc0DDLuOTEE9CsUdoCYZtGgnQE/7wdLPEFrXxNYWYHcxDevULehqsiKW6rMJ4zUpBPGGpHhgfnmNB+6WvUfXgB3lMi1G2h8isKJG+EsRdpk0rBnvoFeUFU4vkLK0+ALBA6IPQzyw5N9G5mMpKuV9YFxTGOsQwDkoxtZcHkLLGVg13ka/OCviqkxMcFcnEr+BCnk/FwxFoRtz4Vy2EDmlTegQX8GKQwmGzIPh+RGYZeehEGbyybPVScQ+oLyhbycYAgYoN962GiAjTSjNSQLdlItvBiFGS06j4VFKhCo9nuAWJRNxwLVCKVss6eaKXim4klo1V/xayaWnnok8uHoyqii7HH1XlRu6USDxxQDin0Ds/EMUiJ9Wk/2QZ+BVuwAAAABJRU5ErkJggg==" />
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