/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class CreateVariableAction extends React.Component<{ data: microflow.ICreateVariableAction, style?: any }, {}>{
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI1SURBVDhPfZLNi1JRGMbvPzGLNkW7Ni1aJUitI4IWLVpm0RTUohazmhZRQaONZQRTUkPr8BNNRW9XUFT8SsePq6KImGlqtkq6klfnmfNe08G5kxceDvec5/29z3s4XKlUgiiKKBQKyOfzyOVyyGazyGQySKfTawC4VeKKxSKm06lK7XZbgSQSiZUQjjpTQavVUjo3m80FhPZYCkSj0f9COIpMZupGG6lUKjMcDiHLsrJPwHg8jlAodCyEo65zIyv+yyK3RqMRekMZwe+zJI1GA5FIBMFgUAXhqDOZSJPJBFT8888UL/b28ewrILRmZ/V6nVIgEAgsQTg2ozQYDBTTeDxGl3U2ZPfxVgTel4DtvUNIrVajFPB6vQsIl0wmL7AZpX6/r5iKA1npbGaAjxXgQ3kZUq1WKQVcLpcCUSixWEzLZpR6vZ5iKv+Soc9MYWYJ5hBDFuC/zSCVSoVSwOFwrC1mCYfDWjaj1O12VZBdBnj82YGH73S48+oqdPpLeGregM1mO7UAkNh8WkEQpE6ns4A8Z5BN5yc8sd6ER9xB7gcP05d7uG46i/P3TxiXACSe57V+v1+il0iQEoPcMFyGq/garvIbZgGMwjpMwl0CjFQAks/n03o8HoleIkGuPDoHn7jLjg4/d2GHAOriudxut4bdtEQP7OKD09jmb2GL17EjYCugW51gLqfTqbHb7dKGaR3XjGfwkr+tdKaV/o+9g6OyWq0ai8Vykpn1TL8p9r9VD4A7AFF6IM3mTmXWAAAAAElFTkSuQmCC" />
                        </div>
                        <div className="text-wrapper">
                            <label>{this.props.data.caption}</label>
                        </div>
                    </div>
                </div>
                <div className="result-item-wrapper" style={{ top: this.props.data.geometry.height }}>
                    <div className="result-text-wrapper">
                        <label>{this.props.data.variableName}</label>
                    </div>
                    <div className="result-type-wrapper">
                        <label>{this.props.data.initialValue}</label>
                    </div>
                </div>
            </div>
        )
    }
}