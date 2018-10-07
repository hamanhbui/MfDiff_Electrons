/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export function renderSizeItem(diff: Diff.ISizeDiff | undefined, revNos: number[], showCommonInfo) {
    if (diff && (diff.isDiff || showCommonInfo)) {
        return <SizeItem diff={diff} revNos={revNos} showCommonInfo={showCommonInfo} />
    }
}

export const SizeItem = (props: { diff: Diff.ISizeDiff, revNos: number[], showCommonInfo }) => {
    return <div>
        {$.renderDiffContainer("Size", <div>
            {$.renderPairItem("Height", props.diff.height, props.revNos, props.showCommonInfo)}
            {$.renderPairItem("Width", props.diff.width, props.revNos, props.showCommonInfo)}
        </div>)}
    </div>
}