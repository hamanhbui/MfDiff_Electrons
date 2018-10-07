// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
export function linearGradient(backgroundColor: string | undefined): JSX.Element | undefined {
    if (backgroundColor === "Red") {
        return (
            <linearGradient id="gradient-red" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0" style={{ "stopColor": "#fffdfd" }}></stop>
                <stop offset="1" style={{ "stopColor": "#ff8282" }}></stop>
            </linearGradient>
        )
    }
    else if (backgroundColor === "Orange") {
        return (
            <linearGradient id="gradient-orange" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0" style={{ "stopColor": "#fffefd" }}></stop>
                <stop offset="1" style={{ "stopColor": "#ffc182" }}></stop>
            </linearGradient >
        )
    }
    else if (backgroundColor === "Yellow") {
        return (
            <linearGradient id="gradient-yellow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0" style={{ "stopColor": "#fffffd" }}></stop>
                <stop offset="1" style={{ "stopColor": "#ffff82" }}></stop>
            </linearGradient>
        )
    }
    else if (backgroundColor === "Green") {
        return (
            <linearGradient id="gradient-green" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0" style={{ "stopColor": "#fdfffd" }}></stop>
                <stop offset="1" style={{ "stopColor": "#82ff82" }}></stop>
            </linearGradient>
        )
    }
    else if (backgroundColor === "Blue") {
        return (
            <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0" style={{ "stopColor": "#fdfdff" }}></stop>
                <stop offset="1" style={{ "stopColor": "#8282ff" }}></stop>
            </linearGradient>
        )
    }
    else if (backgroundColor === "Purple") {
        return (
            <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0" style={{ "stopColor": "#fffffd" }}></stop>
                <stop offset="1" style={{ "stopColor": "#ff82ff" }}></stop>
            </linearGradient>
        )
    }
    else if (backgroundColor === "Gray") {
        return (
            <linearGradient id="gradient-gray" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0" style={{ "stopColor": "#fefefe" }}></stop>
                <stop offset="1" style={{ "stopColor": "#c1c1c1" }}></stop>
            </linearGradient>
        )
    }
    else {
        return (
            <linearGradient id="gradient-default" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0" style={{ "stopColor": "#ffffff" }}></stop>
                <stop offset="1" style={{ "stopColor": "#84B0D3" }}></stop>
            </linearGradient>
        )
    }
}