/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class RollbackAction extends React.Component<{ data: microflow.IRollbackAction, style?: any }, {}>{
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJmSURBVDhPpZHLTxpRFMZd+If0/3DRdRe22y6adNeFNLGLGhLTaFtTGlPUxKIGUkUlgEXwgVgq+EJbNNoCjlYGpKM8rGJRGeRxYYCvd6Y6LdFN05t8Offc+c7v3HOnDsB/6cbDf5G8GbAzvMHNEtNiiFhWIsTiiZD3f2lsOUIM7hAZcQVJv32bvwYYcX0r0ogCKWI/nkTsRwrhg2MwbAxbbBy7kWOcnOaRywNDzh3RWwsYnGUIjTj6mUb38Ac8UPajXWODcWYNfeZ5tPaMY2M7hossoJ0JiN5awMD0FwkgLtdnBncedWJoYkXKs7kq7IsMVr/u4zxdhcYmeWsBveNrMmBmOYDGJjV0Fg/4TBmn5wKCkRTY72c4SpbQbfZeB6iNHhkwveDHXYUaKp0Di949DNp8UPZ40D4cgOEjB+1EQHip6rr1bMj/B6DSL5ByGajSZHLeh3uPu9DcYYTOugXbahR7iQxKQkWKYt6mcRgpoF4GPNc6CSkBggBY3T5pBMNsQDILZRH7e1UqVWQLZZiXDkABDTKgtXeK5AtVaqAj0AdrpCO8tTJSx8NUDnObh4gmc3CsJ3DCC/DunokAnQxo6baSdEaQflWLegy3H75Am94vXVssHrCHoHWEoZliwSWL2I7mRQAvA550movZHBDiTrG8wWF+PQLdNItgjAcbv8DEpzg2w2mYlqLYiRXg9qVqb3D/aR/f1DFKFK9GSfNrI2nuNBHlG5MgzhpPFaWuwQQBEy0gwOXxzsnVvsFNooZ6KoV+joPbn4Kfy8FFO18WK8TvNxZeiRquIA1UOir+Moo5PffX/QImSSEzBdHq+wAAAABJRU5ErkJggg==" />
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