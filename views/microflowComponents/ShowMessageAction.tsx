/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { microflow } from "./interfaces";
import { linearGradient } from "./LinearGradientFunc";
import { findFillName } from "./findFillName";
export class ShowMessageAction extends React.Component<{ data: microflow.IShowMessageAction, style?: any }, {}>{
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
            type: this.props.data.messagetype
        }
        let fillName = findFillName(this.props.data.backgroundColor);
        function Type() {
            if (action.type === "Error") {
                return (
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABw0lEQVQ4T6WSWS+DURCG+xv8BPGjXCNuKrGlsfaGiIggUtKIVC0h4UIIqrEWkVaigipt0Sq1tEXF0hbfOa85p0pbjSUmefJlzpl5Z+Y7owLwL1T5zeYcYph4JvAH5og8ITA5uuLBq8JI8Pc2veETIodCQGGc4y7KEbJtIWQ0IjzQhzNdO3xrNpzfMZzecpzcMBxfcxyGGFzBRLG6fitUJd0W6YSsdkSGBsEWx8EMLVCmR+BvqIFneQ2nEQ6NRpOGsJYxe4qAvgt81QQEA1Csy/Ib7+3AXn05/DccPqp+fM3gCXK4rhIdpAmEdW1Q9I1QHJvSf56fQqyyCG5tqRT4sYOThnooE8PUygVe1peAgB/R1kbYNcU0v6j+Of/BFZc5aQLeBQv8TbWIG3SIlhUipu+Es6IAu7NmeKn1o7BonwQoef8yZYTkKwQiDG7zHBzVariq1LBXFmLHNAOv+PthDg9Vd8vqDM53Ae2gTQrIPRAi35l4yu0zhuB9Ii51D5KbqBCpm/aBweyUScIiD3Hp07mDyMu635lQ4NHl7VMyMUZok3dfgjOh4LYe055IfCTKM+/TnEwoIZfwEkXZ7gVZD38PVG99yyk+Z279gQAAAABJRU5ErkJggg==" />)
            }
            if (action.type === "Warning") {
                return (
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABrklEQVQ4T6WS20pCQRSGfYYeIXqanqCgiyAvg+pCCKK7IorCmwoiiiiiI0XQQYIi6SJDFGlr1lbbHjLzsDXLssiZvzVjltukAy34GGZm/f9awywTgH9hahmyNRCLxAuBP7BPNAmDrRW7itcSI8Pfx/apJkwCwqDEOMfdE0f2kUO/LyLmGUc8fIpEniN+xxDNcoR1hlCGI5BiuEiWi/XNncDUOXEkNzkSC4Ob0CHykR1EnVbE9Qdc5ziihMViMSBieNX1aaAXGNJ6BtGTAaibzUgrkwg6l6VBROfQqHoow6AmOS5uyx0YDNIFatO1ABTXpYFYA7ZeaBFNGvzYQSzsR+R4UArzgcmPVdkbhZZ6Mbzff8ulxmCgHlilqLoDgXY4gjP7GoJp0T4ZkPg8UfWEyi+4Z1vh3+iCd6UD56sd8C61Q1k0wz3dBsdcN1SqfimrM/jeDfrnHdJAzoEw+S7EV3piDMn7cl71HFQmsURUT9oHMzafFInIPTzLPZ0rRFPd+a6FEoOJ7GNFWCT6K3dfkmuh5LGpXa8QFoie2nvDphYSNBJXhLnevaDu4e+B6Q20Di+rYKmPowAAAABJRU5ErkJggg==" />)
            }
            if (action.type === "Information") {
                return (
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABvklEQVQ4T6WSSy9DURDH+xl8BPERkJSFx0JCIiGRYGEjljYWXUnXYmEjaRAhVZRKECIiYkEi2iu9iQRFW6UX0ao+ovWo3nP+5hyKVuMRk/wWc+bMf+bMGQOAf2Fo61srIqaJNIE/sE6UCIElx5YXGZ2R4O9tRTkTIj4hoDPOkXjgsLs1dNhVGC0KmifcmNjVcJVg0GIc51GG01sO3w3Dcfi1WK/VCUO3ZVM6s6oG46gH5fYkTNs6gnccDZNHsLo0aHEOk8mUg7D+OfVDoH3KjUpHErWLGdTNp95pnVQRjHKcUfXTWwZvmOM49NpBjkD1sIKKuTQal59k9Z1rhpqFZ1QNKVLg5w6oknEmic4NXSY3rTzL57TaVHq/qP7x/qMQlzk5AjYaWNmIRyYL6hdS0h+nGQSodX9EtE8ClOyhuDApkP2FywSHVdHQQhVLB11oo47GnUEExPQjHF6qfiKrMxy+CZhtLikg90CIfGfiK/cuGMI0H2Gf9yC7iTrxedPeGVs7lEnC4skn6dP5PlFScL/zoYv+69h9NvGRMGdjXy7nQ5cHRlYPRGKK6MmP5zj5UEIxESC6CsUFBQ9/Dwwv4LchJe02nfsAAAAASUVORK5CYII=" />)
            }
        }
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
                            {Type()}
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