/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"

export const AnnotationItem = (props: { diff: Diff.IAnnotationDiff, revNos: number[], showCommonInfo: boolean }) => (
    <div>
        {$.renderDiffContainer("Caption", <div>
            {$.renderPairTextAreaItem("", props.diff.caption, props.showCommonInfo)}
        </div>)}
    </div>
)