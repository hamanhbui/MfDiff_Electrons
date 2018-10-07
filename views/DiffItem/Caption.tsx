/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import single = require("../../MfDiff/SingleInterface")
import * as $ from "./"

export function renderCaption(diff: Diff.IMfObjectDiff, revNos: number[], showCommonInfo: boolean) {
    if ([single.ElementType.Annotation, single.ElementType.ExclusiveSplit, single.ElementType.InheritanceSplit].indexOf(diff.typeName as single.ElementType) !== -1 
        || !diff["caption"] || (!diff['caption']['isDiff'] && !showCommonInfo)) {
            return;
        }
        return <Caption diff={diff['caption']} revNos={revNos} showCommonInfo={showCommonInfo} />
}

export const Caption = (props: { diff: Diff.IBasicDiff<string>, revNos: number[], showCommonInfo: boolean }) => {
    return <div>
        {$.renderDiffContainer("Caption", <div>
            {$.renderPairTextAreaItem("", props.diff, props.showCommonInfo)}
        </div>)}
    </div>
}