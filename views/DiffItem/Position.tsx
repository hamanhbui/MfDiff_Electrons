/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export function renderPositionItem(diff: Diff.IPointDiff | undefined, revNos: number[], showCommonInfo) {
    if (diff) {
        if (diff.isDiff || (!diff.isDiff && showCommonInfo)) {
            return <$.PositionItem diff={diff} revNos={revNos} showCommonInfo={showCommonInfo} />
        }
    }
}

export const PositionItem = (props: { diff: Diff.IPointDiff, revNos: number[], showCommonInfo: boolean }) => {
    return <div>
        {$.renderDiffContainer("Position", <div>
            {$.renderPairItem("X", props.diff.x, props.revNos, props.showCommonInfo)}
            {$.renderPairItem("Y", props.diff.y, props.revNos, props.showCommonInfo)}
        </div>)}
    </div>
} 