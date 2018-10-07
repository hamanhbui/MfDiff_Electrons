/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class ShowHomePageAction extends React.Component<{ data: microflow.IShowHomePageAction, style?: any }, {}>{
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK8SURBVDhPlZDbT5JhHMe54o/wrq3DZqGZZZBmI9vSGU0JMFazItespgMhEFREhDECpszTbI6GI4oizQPTwHIeBpvVNA9tpnaguDKVdzLtIv328pY4kpsuvs/2/Pb7fJ73/dIAJExv2WE6mSSPmJHkkabSE+1Ek3AYhfvEjJBHmrI5oDi66VUdC3nVxxNK9gz6yo/QSTA8asrFlPMO3rvK4W8qhE97MuzTMfdI4i4eSQp9QH40PGbJx/RTMRkJpt0yzHSrMN4mwICWFfbUsuIku7AslT6oTCPGGzmYeSaFv5kLb30mXuqzMNoiwKS7BkNWPtxKJvFYmhGTUMegIo3uVaUTfmsBZp7L4W/hYcjIxtzsNJX+ejZ8Fj4CjxTo1RXAVppOtF5PoyQ0siA6WRDhb+JipktJfiofXsNZvH0zgZWVFaytrWFxYR5O+Wl0aTh49eAuOu+dh4nHIHQXkuk0X21GwN9y6e9/FpFwDqYm32F1dZWCd7LwcR5tJUw8FJ9Dj/kqmkuyoGIfDNDIZnO9OtbWaGsR+jTZ218+LcZe/jffvn5GXT4DjddOQZl9YItM7p8Ca1m5L9TMMWuDZXtjY4NalslkkMvlUCgUqKyspGaRSAQW030o2MmzUThW4k5MJtM6QRDUchRsb29HR0cHqqurY4KoVCgUHtph4gR6vX49HA5Ty1VVVbDZbLDb7airq4sJJBIJeDzerqDs9Y0UUc/lKwI7Z0hgKfjlGOlEVKJWq+FwOOB0OkGKqdmTD3aIuoUQ2DhzeVa2JlNzooBGwt/F/bdQM1yBsn4RRNZihEIhaLVauFwuuN1uGI1GBINBqIfkaJjQQTMiQ7GDj1RxcoRGvjxM2oKkLXBGnElwbucvl5aWLhkMBgoke4HZbAaXy10qrLi4nFef8zNTnTFBwj/239w3HNfB/we03419rIdhAWPUAAAAAElFTkSuQmCC" />
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