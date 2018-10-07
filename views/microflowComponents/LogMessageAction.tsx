/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class LogMessageAction extends React.Component<{ data: microflow.ILogMessageAction, style?: any }, {}>{
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAxdJREFUOE9dkltIFFEYx08PPfQQQfjcQ4F0QUIFKegh6PYg9GCUlokEPVQkFV2k7GreKjMLIbKyqDUk7WYXb7Ppbrarq6HoWruO7rpeVnfW1RXd3bns7L/PcaLogx8DZ77f/5zzzbA/lV03mkJYbnACchumkFPvxbH346C1IDFG9BDdRAtRQ6QSy3WdsawaV05pm4D/a0FSIcwrcPpF9HtFWNwhvOrygfoDRJauM5ZpGCyotPg1aXQ2ismgCv+cipmQijlRRURWIUe114goMbQNLoAcQdcZy3g28KDa5oeiAgM+FQ6/Cl5Q4Q6oGKWwcQobDy4lnH4+AkkBihvd0HXG9lf2Gup7AwiGAZtHRveYgl6i36tQoAKHL0qBUVA+zjztg8k5A3ImdJ2xtApbi8kZhCeg0PEkmIckfHdJsI7IsI3K+EH0TshQY8Che12g/jlil64ztresfdAxGUIfNXEUwPESWnkZpmEZXf0WONqvwuYKaFdMr+gA9a/W1aVKLTFKwXAUVrcEI+3eOkQyBbTzc3C2nUWAr0V/53NtkPvumkD9q3SVsT35DStSC5u06Zo0WdRo40X8sNXA/8sAZWEIP+sPY9bnAPUrxDJdZ2xH3oc1aUVNkKIxEhePTjIFWOwuDNRnQfR/gugtw8zwZzharmD35Xd/h7dY28+/Xn+gqIEGFIPZJWvH13bn7mDaWQdxLB/mkmTIgTr0VO3EhZv5vK4ytu2UIY6oLX07gAn63i+sEbzpicDYYYXbmAdJeIHw0BGYixMR8eQi6PqCpvLd8533t6zUArYer0onwgcLPyGv2olTVQ6cfGxH05MjmKXBRUbOITSYsQRP1/GWw2N6gO+3k65qASlHH90qNFi1P+xPCfa38JjLIE091HYP8Zl0hSTtGXadQHjyA8w3E3ymG5s2suTsimM55Y142fwTHy1ufLNPwvYoFeHpYUgzRogCzUCo/Yc3UObtGO8w4GtefC1LzCyPIwqIl8QXopMr3hJtLUqOfS1IgjE/Edz1zeCuJYC7koDmSxti3MV40Zi7LsxdWPvtN/n4yGDKLF7+AAAAAElFTkSuQmCC" />
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