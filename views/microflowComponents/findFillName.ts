// <reference path="../../typings/index.d.ts" /> 
export function findFillName(backgroundColor: string | undefined): string {
    let fillName: string = "";
    if (backgroundColor === "Red") {
        fillName = "url(#gradient-red)";
    }
    else if (backgroundColor === "Orange") {
        fillName = "url(#gradient-orange)";
    }
    else if (backgroundColor === "Yellow") {
        fillName = "url(#gradient-yellow)";
    }
    else if (backgroundColor === "Green") {
        fillName = "url(#gradient-green)";
    }
    else if (backgroundColor === "Blue") {
        fillName = "url(#gradient-blue)";
    }
    else if (backgroundColor === "Purple") {
        fillName = "url(#gradient-purple)";
    }
    else if (backgroundColor === "Gray") {
        fillName = "url(#gradient-gray)";
    }
    else {
        fillName = "url(#gradient-default)";
    }
    return fillName;
}