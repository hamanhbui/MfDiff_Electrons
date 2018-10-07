/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import Diff = require("../../MfDiff/DiffInterface")
import * as $ from "./"
import { loadToIBasicDiff } from "../../MfDiff/LoadDiffInterface"

export function renderParentObject(diff: Diff.IBasicDiff<Diff.IMfElementDiffBase> | undefined, revNos: number[], showCommonInfo: boolean) {
    if (diff) {
        return <ParentObjectItem diff={diff} revNos={revNos} showCommonInfo={showCommonInfo}/>
    }
}

export const ParentObjectItem = (props: { diff: Diff.IBasicDiff<Diff.IMfElementDiffBase>, revNos: number[], showCommonInfo: boolean }) => {
    return <div>
        {$.renderDiffContainer("ParentObjectItem", <div>
            {$.renderPairItem("Type", loadToIBasicDiff(props.diff.member1 && props.diff.member1.typeName.name, props.diff.member2 && props.diff.member2.typeName.name), props.revNos, props.showCommonInfo)}
        </div>)}
    </div>
}